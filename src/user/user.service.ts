import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { DbService } from 'src/db.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DbService) {}

  async findAll(): Promise<User[]> {
    return await this.dbService.findAll<User>('/user');
  }

  async findOne(id: string): Promise<User> {
    return (await this.dbService.findOne<User>('/user', id)) as User;
  }

  async createUser(userData: CreateUserDTO): Promise<boolean> {
    return await this.dbService.create<CreateUserDTO>('/user', userData);
  }
}
