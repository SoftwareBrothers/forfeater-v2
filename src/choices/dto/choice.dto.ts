import { IsNumber, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class ChoiceDto {
  @IsString()
  @IsOptional()
  comment: string;
}
