import { Module } from '@nestjs/common';
import { authProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './lib/entities';
import { UtilsModule } from 'libs/utils/src';
import { OtpEntity } from './lib/entities/otp.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, OtpEntity]), UtilsModule],
  providers: [...authProviders],
  exports: [...authProviders],
})
export class AuthLibModule {}
