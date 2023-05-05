import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createData: AuthCredentialsDTO) {
    const existUser = this.userRepository.findExistUser(createData.email);
    if (existUser) throw new ConflictException('이미 존재하는 email 입니다.');
    else {
      this.userRepository.createUser(createData);
    }
  }
}
