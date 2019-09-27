import { IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  vendor: number;
}
