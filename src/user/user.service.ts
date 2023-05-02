import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private db: JsonDB;
  private readonly DB_NAME = 'db';
  private readonly TABLE_NAME = 'user';

  constructor() {
    (async () => {
      await this.init();
    })();
  }

  private async init() {
    this.db = new JsonDB(new Config(this.DB_NAME, true, true, '/'));
    try {
      await this.db.getData(`/${this.TABLE_NAME}`);
    } catch (err) {
      await this.db.push(`/${this.TABLE_NAME}`, []);
      console.log('err', err);
    }
    console.log(this.db);
  }

  async findAll(): Promise<User[]> {
    return (await this.db.getData(`/${this.TABLE_NAME}`)) as User[];
  }

  async createUser(userData: CreateUserDTO): Promise<User> {
    const users = await this.findAll();
    const newUser = { id: userData.email, ...userData };
    users.push(newUser);
    this.db.push(`/${this.TABLE_NAME}`, users, true);
    const result = await this.db.getObject<User>(`/${this.TABLE_NAME}`);
    return result;
  }
}
