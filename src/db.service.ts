import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DbService {
  private db: JsonDB;
  private readonly DB_NAME = 'db';

  constructor() {
    (async () => {
      await this.initDatabase();
    })();
  }

  private async initDatabase() {
    this.db = new JsonDB(new Config(this.DB_NAME, true, true, '/'));
    try {
      await this.db.getData(`/user`);
      await this.db.getData(`/auth`);
      await this.db.getData(`/todo`);
    } catch (err) {
      await this.db.push(`/user`, []);
      await this.db.push(`/auth`, []);
      await this.db.push(`/todo`, []);
      console.log('err', err);
    }
    console.log(this.db);
  }

  async findAll<T>(tableName: string): Promise<T[]> {
    return this.db.getData(tableName);
  }

  async findOne<T>(tableName: string, id: string): Promise<T> {
    const founds = (await this.db.getData(tableName)) as T[];
    const found = founds.find((v: any) => v.id === id);
    return found;
  }

  async create<T>(tableName: string, createData: T) {
    const founds = await this.findAll(tableName);
    try {
      const newData = { id: uuidv4(), ...createData };
      founds.push(newData);
      await this.db.push(tableName, founds, true);
      return true;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async update<T>(tableName: string, id: string, updateData: T) {
    const founds = await this.findAll(tableName);
    const findIndex = founds.findIndex((v: any) => v.id === id);
    if (findIndex === -1) {
      throw new NotFoundException();
    }

    try {
      const updatedData = { id, ...updateData };
      this.db.push(`${tableName}[${id}]`, updatedData, false);
      return true;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(tableName: string, id: string) {
    const founds = await this.findAll(tableName);
    const findIndex = founds.findIndex((v: any) => v.id === id);
    if (findIndex === -1) {
      throw new NotFoundException();
    }
    this.db.delete(`${tableName}[${findIndex}]`);
    return true;
  }
}
