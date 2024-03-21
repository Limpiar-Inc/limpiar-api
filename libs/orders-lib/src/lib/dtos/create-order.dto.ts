// order.dto.ts

import {
  IsString,
  IsBoolean,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ShippingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address_1: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  postcode: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_2: string;
}

class BillingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address_1: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @ApiProperty()
  state: string;

  @IsString()
  @ApiProperty()
  @ApiProperty()
  country: string;

  @IsString()
  @ApiProperty()
  postcode: string;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address_2: string;
}

class ShippingLineDto {
  @IsString()
  @ApiProperty()
  total: string;

  @IsString()
  @ApiProperty()
  method_title: string;

  @IsString()
  @ApiProperty()
  method_id: string;
}

class LineItemDto {
  @IsNotEmpty()
  @ApiProperty()
  quantity: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  total: string;

  @IsNotEmpty()
  @ApiProperty()
  product_id: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  payment_method: string;

  @ValidateNested()
  @ApiProperty()
  @Type(() => ShippingDto)
  shipping: ShippingDto;

  @ApiProperty()
  @IsBoolean()
  set_paid: boolean;

  @ValidateNested()
  @ApiProperty()
  @Type(() => BillingDto)
  billing: BillingDto;

  @ValidateNested()
  @ApiProperty()
  @Type(() => ShippingLineDto)
  shipping_lines: ShippingLineDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty()
  @Type(() => LineItemDto)
  line_items: LineItemDto[];

  @IsString()
  @ApiProperty()
  payment_method_title: string;
}
