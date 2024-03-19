import { IsNotEmpty, IsNumber } from 'class-validator';

export class ValidateOtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @IsNotEmpty()
  @IsNumber()
  newPassword: string;
}
