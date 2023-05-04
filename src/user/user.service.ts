import { Injectable } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DBService) {}

  async findAll(): Promise<User[]> {
    return await this.dbService.findAll<User>('/user');
  }

  async findOne(id: string): Promise<User> {
    return (await this.dbService.findOne<User>('/user', id)) as User;
  }

  async createUser(userData: CreateUserDTO): Promise<string> {
    return await this.dbService.create<CreateUserDTO>('/user', userData);
  }
}
