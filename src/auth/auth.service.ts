import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async signIn(username: string, pass: string): Promise<void> {
    // const user = await this.userService.findOne()
  }
}
