import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ValidateOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  newPassword: string;
}
