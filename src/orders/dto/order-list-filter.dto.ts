import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class OrderListFilterDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiModelProperty()
  active?: boolean;
}
