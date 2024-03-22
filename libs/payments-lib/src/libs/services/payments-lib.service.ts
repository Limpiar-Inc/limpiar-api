import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CraetePaymentDto } from '../dtos/craete-payment.dto';
import { ORDER_LIB_SERVICE } from '@app/orders-lib/lib/constants';
import { OrdersLibService } from '@app/orders-lib';
import { AUTH_SERVICE } from '@app/auth/lib/constants';
import { AuthLibService } from '@app/auth';
import { UsersEntity } from '@app/auth/lib/entities';
import { StatusEnums } from '@app/orders-lib/lib/enums';
import { WOOCOMERCE_SERVICE } from 'libs/utils/src/lib/constants';
import { WoocomerseService } from 'libs/utils/src/lib/services/woocomerce.service';
import { ConfigService } from '@nestjs/config';
const { Client, Environment } = require('square');

@Injectable()
export class PaymentsLibService {
  private client;
  constructor(
    @Inject(ORDER_LIB_SERVICE) private readonly ordersService: OrdersLibService,
    private configService: ConfigService,
    @Inject(AUTH_SERVICE) private readonly authService: AuthLibService,
    @Inject(WOOCOMERCE_SERVICE)
    private readonly woocomerceService: WoocomerseService,
  ) {
    this.client = new Client({
      environment: Environment.Sandbox, // Change to Environment.Production for live transactions
      accessToken: this.configService.get<string>('SQUARE_TOKEN'),
    });
  }
  public async processRequest(data: CraetePaymentDto, user: UsersEntity) {
    try {
      console.log(data);
      const order = await this.ordersService.getOrderByWoocomerce(data.orderId);

      if (!order) {
        throw new BadRequestException('order doesnot exsists');
      }
      if (order.status == StatusEnums.PAID) {
        throw new BadRequestException('payment is already paid');
      }

      // console.log(data.amount * 100, 'ddd', order.amount);
      if (data.amount * 100 !== order.amount) {
        throw new BadRequestException(
          `Order price and given price are different.  order price:${order.amount / 100}, given price ${data.amount}`,
        );
      }

      const paymentsApi = this.client.paymentsApi;

      const request = {
        sourceId: data.sourceId,
        amountMoney: {
          amount: order.amount,
          currency: 'USD',
          autoComplete: true,
        },
        idempotencyKey: `${Date.now()}`,
      };

      const response = await paymentsApi.createPayment(request);

      const result = response.result.payment;

      order.status = StatusEnums.PAID;

      await this.ordersService.ordersRepo.OrdersEntity.save(order);
      await this.woocomerceService.putRequest(
        'orders',
        { status: 'completed' },
        data.orderId.toString(),
      );
      const obj = {
        paymend_id: result.id,
        amount: `${data.amount}$`,
        message: `order ${data.orderId} has paid succsesfully`,
        order: { status: StatusEnums.PAID },
      };

      return { message: 'succses', data: obj };
    } catch (e) {
      console.log(e, 'error');

      if (e.errors) {
        this.sendErrorMessage(e.errors);
      }
      throw new BadRequestException(e);
    }
  }

  private sendErrorMessage(errors) {
    switch (errors[0].code) {
      case 'UNAUTHORIZED':
        throw new UnauthorizedException(
          'Server Not Authorized. Please check your server permission.',
        );
      case 'GENERIC_DECLINE':
        throw new BadRequestException(
          'Card declined. Please re-enter card information.',
        );

      case 'CVV_FAILURE':
        throw new BadRequestException(
          'Invalid CVV. Please re-enter card information.',
        );

      case 'ADDRESS_VERIFICATION_FAILURE':
        throw new BadRequestException(
          'Invalid Postal Code. Please re-enter card information.',
        );

      case 'EXPIRATION_FAILURE':
        throw new BadRequestException(
          'Invalid expiration date. Please re-enter card information.',
        );

      case 'INSUFFICIENT_FUNDS':
        throw new BadRequestException(
          'Insufficient funds; Please try re-entering card details.',
        );

      case 'CARD_NOT_SUPPORTED':
        throw new BadRequestException(
          '	The card is not supported either in the geographic region or by the MCC; Please try re-entering card details.',
        );

      case 'PAYMENT_LIMIT_EXCEEDED':
        throw new BadRequestException(
          'Processing limit for this merchant; Please try re-entering card details.',
        );

      case 'TEMPORARY_ERROR':
        throw new ConflictException(
          'Unknown temporary error; please try again;',
        );

      default:
        throw new BadRequestException(errors);
    }
  }
}
