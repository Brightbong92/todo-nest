import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {}

  async findAll(): Promise<User[]> {
    return await this.dbService.findAll<User>('/user');
  }

  async findUser(id: string): Promise<User> {
    const user = await this.dbService.findOne<User>('/user', id);
    if (user.id === id) {
      return user;
    } else {
      throw new NotFoundException();
    }
  }

  async createUser(userData: CreateUserDTO): Promise<string> {
    const id = userData.email;
    return await this.dbService.create<CreateUserDTO>('/user', id, userData);
  }
}
