import { Type } from 'class-transformer';
import { IsNumber, IsDateString, IsDate } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  vendor: number;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  products: number[];

  @Type(() => Date)
  @IsDate()
  deadlineAt: Date;

  @Type(() => Date)
  @IsDate()
  deliveryAt: Date;
}
