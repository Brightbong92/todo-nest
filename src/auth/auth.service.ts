import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    const { email } = authCredentialsDto;
    const existUser = await this.userRepository.findOne(email);
    if (existUser) throw new ConflictException('이미 존재하는 email 입니다.');
    else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        authCredentialsDto.password,
        salt,
      );
      authCredentialsDto.password = hashedPassword;
      this.userRepository.createUser(authCredentialsDto);
    }
  }

  async signIn(signInDto: SignInDTO): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user: User = await this.userRepository.findOne(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + Payload )
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
