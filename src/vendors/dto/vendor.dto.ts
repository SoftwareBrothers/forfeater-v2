import { IsString } from 'class-validator';

export class VendorDto {
  @IsString()
  name: string;
}
