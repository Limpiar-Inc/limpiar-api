import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ORDERS_REPOSITORY } from '../constants';
import { OrdersRepository } from '../repositories/orders.repository';
import { UsersEntity } from '@app/auth/lib/entities';
import { WOOCOMERCE_SERVICE } from 'libs/utils/src/lib/constants';
import { parse, stringify, toJSON, fromJSON } from 'flatted';
import { WoocomerseService } from 'libs/utils/src/lib/services/woocomerce.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { StatusEnums } from '../enums';

@Injectable()
export class OrdersLibService {
  constructor(
    @Inject(ORDERS_REPOSITORY) public readonly ordersRepo: OrdersRepository,
    @Inject(WOOCOMERCE_SERVICE)
    private readonly woocomereceService: WoocomerseService,
  ) {}

  public async createOrder(currentUser: UsersEntity, orderDto: CreateOrderDto) {
    try {
      const orderCreatedInWoocomerce = await this.woocomereceService.postRequst(
        'orders',
        orderDto,
      );
      let totalSum = 0;

      orderDto.line_items.forEach((item) => {
        // Extracting the numerical value from the total string, rounding to the nearest cent, and converting to cents
        const totalCents = Math.round(
          parseFloat(item.total.replace('$', '')) * 100,
        );

        // Adding the total in cents to the sum
        totalSum += totalCents;
      });

      const orderForDb = this.ordersRepo.OrdersEntity.create({
        status: StatusEnums.PENDING,
        amount: totalSum,
        woocomerceId: orderCreatedInWoocomerce.data.id,
        user: currentUser,
      });
      await this.ordersRepo.OrdersEntity.save(orderForDb);

      return {
        succses: true,
        data: { order: orderCreatedInWoocomerce.data },
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async getOrderByWoocomerce(woocId: number) {
    try {
      return await this.ordersRepo.OrdersEntity.findOne({
        where: { woocomerceId: woocId },
      });
    } catch (err) {
      throw err;
    }
  }
  public async getMyOrders(currentUser: UsersEntity) {
    try {
      const myOrders = await this.ordersRepo.OrdersEntity.find({
        where: { user: { id: currentUser.id } },
      });

      if (!myOrders.length) {
        return {
          succses: true,
          data: { orders: [] },
        };
      }
      const orders = await Promise.all(
        myOrders.map(async (order) => {
          const data = await this.woocomereceService.getRequest(
            'orders',
            order.woocomerceId.toString(),
          );
          return data.data;
        }),
      );

      return {
        succses: true,
        data: { orders: orders },
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
