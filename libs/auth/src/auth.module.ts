import { Module } from '@nestjs/common';
import { authProviders } from './lib/providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './lib/entities';
import { UtilsModule } from 'libs/utils/src';
import { OtpEntity } from './lib/entities/otp.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthLibService } from './lib/services/auth.service';
import { AccsesTokenStrategy } from 'libs/common/strategies/accses-token.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, OtpEntity]),
    UtilsModule,
    PassportModule,
  ],
  providers: [...authProviders, AccsesTokenStrategy],
  exports: [...authProviders, AccsesTokenStrategy],
})
export class AuthLibModule {}
