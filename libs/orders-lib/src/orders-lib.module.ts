import { Module } from '@nestjs/common';
import { OrdersLibService } from './lib/services/orders-lib.service';
import { ordersProviders } from './lib/providers/orders.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './lib/entities';
import { UtilsModule } from 'libs/utils/src';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersEntity]), UtilsModule],
  providers: [...ordersProviders],
  exports: [...ordersProviders],
})
export class OrdersLibModule {}
