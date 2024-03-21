import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbLibModule } from '@app/db-lib';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from 'libs/utils/src';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/.env`,
    }),
    DbLibModule,

    AuthModule,

    OrdersModule,

    PaymentsModule,
  ],
  // providers: [AppService],
})
export class AppModule {}
