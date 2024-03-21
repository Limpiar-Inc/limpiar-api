import { Provider } from '@nestjs/common';
import { ORDER_LIB_SERVICE, ORDERS_REPOSITORY } from '../constants';
import { OrdersLibService } from '../services/orders-lib.service';
import { OrdersRepository } from '../repositories/orders.repository';

export const ordersProviders: Provider[] = [
  { provide: ORDER_LIB_SERVICE, useClass: OrdersLibService },
  { provide: ORDERS_REPOSITORY, useClass: OrdersRepository },
];
