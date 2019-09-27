import { IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderListFilterDto {
  @IsBoolean()
  @Type(() => Boolean)
  active?: boolean;
}
