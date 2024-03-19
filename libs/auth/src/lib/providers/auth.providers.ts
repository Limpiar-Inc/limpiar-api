import { Provider } from '@nestjs/common';
import { AUTH_SERVICE, OTP_REPOSITORY, USERS_REPOSITORY } from '../constants';
import { AuthLibService } from '../services/auth.service';
import { UsersRepository } from '../repositories/user.repository';
import { OtpEntity } from '../entities/otp.entity';
import { OtpRepository } from '../repositories/otp.repository';

export const authProviders: Provider[] = [
  { provide: AUTH_SERVICE, useClass: AuthLibService },
  { provide: USERS_REPOSITORY, useClass: UsersRepository },
  { provide: OTP_REPOSITORY, useClass: OtpRepository },
];
