import { IsNumber, IsString, IsOptional} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChoiceDto {
  @IsNumber()
  @ApiModelProperty()
  productId: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  comment: string;
}
