import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class VendorDto {
  @IsString()
  @ApiModelProperty()
  name: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiModelProperty()
  url: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  @ApiModelProperty()
  logoUrl: string;
}
