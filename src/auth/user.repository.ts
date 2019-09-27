import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpCredentialsDto: SignUpCredentialsDto): Promise<void> {
    const { first_name, last_name, email, password } = signUpCredentialsDto;

    const user = new User();
    user.email = email;
    user.first_name = first_name;
    user.last_name = last_name;
    user.hash = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.hash);

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') { // duplicate error code
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && await user.validatePassword(password)) {
      return user;
    }

    return null;
  }

  private async hashPassword(password: string, hash: string): Promise<string> {
    return bcrypt.hash(password, hash);
  }
}
