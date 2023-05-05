import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import { SignInDTO } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    const { email } = authCredentialsDto;
    const existUser = await this.userRepository.findOne(email);
    if (existUser) throw new ConflictException('이미 존재하는 email 입니다.');
    else {
      const salt = await bcrypt.genSalt();
      const hasedPassword = await bcrypt.hash(
        authCredentialsDto.password,
        salt,
      );
      authCredentialsDto.password = hasedPassword;
      this.userRepository.createUser(authCredentialsDto);
    }
  }

  async signIn(signInDto: SignInDTO): Promise<string> {
    const { email, password } = signInDto;
    const user = (await this.userRepository.findOne(email)) as User;
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'login success';
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
