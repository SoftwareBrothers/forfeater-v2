import { IsString, MinLength, MaxLength, Matches, IsEmail } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SignUpCredentialsDto {
  @IsString()
  @MinLength(3)
  @ApiModelProperty()
  firstName: string;

  @IsString()
  @MinLength(3)
  @ApiModelProperty()
  lastName: string;

  @IsString()
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Password is too weak' })
  @ApiModelProperty()
  password: string;
}
