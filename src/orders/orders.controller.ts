import { UsersEntity } from '@app/auth/lib/entities';
import { OrdersLibService } from '@app/orders-lib';
import { ORDER_LIB_SERVICE } from '@app/orders-lib/lib/constants';
import { CreateOrderDto } from '@app/orders-lib/lib/dtos/create-order.dto';
import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'libs/common/decorators/current-user.decorator';
import { AccessTokenGuard } from 'libs/common/guards/accses-token.guard';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_LIB_SERVICE)
    private readonly ordersLibService: OrdersLibService,
  ) {}
  @Post()
  @UseGuards(AccessTokenGuard)
  public createOrder(
    @Body() data: CreateOrderDto,
    @CurrentUser() user: UsersEntity,
  ) {
    return this.ordersLibService.createOrder(user, data);
  }

  @Get()
  @UseGuards(AccessTokenGuard)
  public getMyOrders(@CurrentUser() user: UsersEntity) {
    return this.ordersLibService.getMyOrders(user);
  }
}
