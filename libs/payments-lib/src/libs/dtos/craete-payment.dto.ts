import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CraetePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  sourceId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  orderId: number;
}
