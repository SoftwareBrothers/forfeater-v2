import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderListFilterDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  active?: boolean;
}
