import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { AuthLibModule } from '@app/auth';
import { OrdersLibModule } from '@app/orders-lib';

@Module({
  imports: [AuthLibModule, OrdersLibModule],
  controllers: [OrdersController],
})
export class OrdersModule {}
