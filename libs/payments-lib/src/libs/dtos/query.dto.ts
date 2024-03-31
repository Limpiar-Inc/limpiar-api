
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  @ApiProperty()
  amount: number;


  @IsNotEmpty()
  @ApiProperty()
  orderId: number;



  @IsNotEmpty()
  @ApiProperty()
  access: string;

}
