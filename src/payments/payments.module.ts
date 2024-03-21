import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PaymentsLibModule } from '@app/payments-lib';

@Module({
  imports: [AuthModule, PaymentsLibModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
