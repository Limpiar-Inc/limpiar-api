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

class ShippingDto {
  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsString()
  phone: string;

  @IsString()
  last_name: string;

  @IsString()
  email: string;

  @IsString()
  postcode: string;

  @IsString()
  first_name: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  @IsOptional()
  address_2: string;
}

class BillingDto {
  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  postcode: string;

  @IsString()
  last_name: string;

  @IsString()
  first_name: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  address_2: string;
}

class ShippingLineDto {
  @IsString()
  total: string;

  @IsString()
  method_title: string;

  @IsString()
  method_id: string;
}

class LineItemDto {
  @IsNotEmpty()
  quantity: number;

  @IsString()
  name: string;

  @IsString()
  total: string;

  @IsNotEmpty()
  product_id: number;
}

export class CreateOrderDto {
  @IsString()
  payment_method: string;

  @ValidateNested()
  @Type(() => ShippingDto)
  shipping: ShippingDto;

  @IsBoolean()
  set_paid: boolean;

  @ValidateNested()
  @Type(() => BillingDto)
  billing: BillingDto;

  @ValidateNested()
  @Type(() => ShippingLineDto)
  shipping_lines: ShippingLineDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LineItemDto)
  line_items: LineItemDto[];

  @IsString()
  payment_method_title: string;
}
