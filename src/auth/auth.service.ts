import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(username: string, pass: string): Promise<any> {
    // const user = await this.userService.findOne()
  }
}