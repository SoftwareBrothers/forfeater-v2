import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    return this.userRepository.signUp(signUpCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.validatePassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { firstName, lastName, email, id } = user;
    const payload: JwtPayload = { firstName, lastName, id, email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
