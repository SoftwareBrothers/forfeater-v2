import { IsNumber, IsArray } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  vendor: number;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  products: number[];
}
