import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbLibModule } from '@app/db-lib';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from 'libs/utils/src';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/config/env/.env`,
    }),
    DbLibModule,

    AuthModule,
  ],
  // providers: [AppService],
})
export class AppModule {}
