import { AuthLibService } from '@app/auth';
import { AUTH_SERVICE } from '@app/auth/lib/constants';
import { SignupDto, SigninDto, ResetPasswordDto } from '@app/auth/lib/dtos';
import { ValidateOtpDto } from '@app/auth/lib/dtos/validate-otp.dto';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: AuthLibService,
  ) {}
  @Post('signup')
  public signup(@Body() data: SignupDto) {
    return this.authService.signup(data);
  }

  @Post('signin')
  public login(@Body() data: SigninDto) {
    return this.authService.login(data);
  }

  @Post('reset-password')
  public async resetPassword(@Body() data: ResetPasswordDto) {
    return this.authService.resetPasswordV1(data.email);
  }

  @Post('validate-otp')
  public async validateOtp(@Body() data: ValidateOtpDto) {
    return this.authService.validateOtp(data.otp, data.newPassword);
  }
}
