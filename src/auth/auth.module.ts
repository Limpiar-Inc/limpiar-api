import { AuthLibModule } from '@app/auth';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AccessTokenGuard } from 'libs/common/guards/accses-token.guard';
import { PassportModule } from '@nestjs/passport';
import { AccsesTokenStrategy } from 'libs/common/strategies/accses-token.strategy';

@Module({
  imports: [AuthLibModule],
  controllers: [AuthController],
})
export class AuthModule {}
