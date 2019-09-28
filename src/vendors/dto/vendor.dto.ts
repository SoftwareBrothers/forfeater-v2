import { IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class VendorDto {
  @IsString()
  @ApiModelProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  url: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty()
  logoUrl: string;
}
