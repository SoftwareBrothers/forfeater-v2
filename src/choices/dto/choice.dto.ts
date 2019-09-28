import { IsNumber, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChoiceDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty()
  comment: string;
}
