import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ValidateOtpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  otp: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
