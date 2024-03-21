import { Module } from '@nestjs/common';
import { PaymentsLibService } from './libs/services/payments-lib.service';
import { OrdersLibModule, OrdersLibService } from '@app/orders-lib';
import { AuthLibModule } from '@app/auth';
import { UtilsModule } from 'libs/utils/src';

@Module({
  imports: [OrdersLibModule, AuthLibModule, UtilsModule],
  providers: [PaymentsLibService],
  exports: [PaymentsLibService],
})
export class PaymentsLibModule {}
