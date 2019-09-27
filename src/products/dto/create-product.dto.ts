import { IsNumber, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  vendor: number;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  requireDescription: boolean;

  @IsBoolean()
  isVege: boolean;

  @IsBoolean()
  isVegan: boolean;
}
