import { IsNumber, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsString()
  @MinLength(3)
  @ApiModelProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  description: string;

  @IsBoolean()
  @ApiModelProperty()
  requireDescription: boolean;

  @IsBoolean()
  @ApiModelProperty()
  isVege: boolean;

  @IsBoolean()
  @ApiModelProperty()
  isVegan: boolean;
}
