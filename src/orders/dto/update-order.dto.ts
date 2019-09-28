import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @Type(() => Date)
  @IsDate()
  @ApiModelProperty()
  deadlineAt: Date;

  @Type(() => Date)
  @IsDate()
  @ApiModelProperty()
  deliveryAt: Date;
}
