import { Type } from 'class-transformer';
import { IsNumber, IsDateString, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNumber()
  @ApiModelProperty()
  vendor: number;

  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @ApiModelProperty()
  products: number[];

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty()
  deadlineAt: Date;

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty()
  deliveryAt: Date;
}
