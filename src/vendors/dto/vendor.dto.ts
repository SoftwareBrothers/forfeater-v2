import { IsOptional, IsString } from 'class-validator';

export class VendorDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  logoUrl: string;
}
