import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { DATABASE_TODO } from './constants';

@Injectable()
export class DBService {
  private static db: JsonDB;

  constructor() {
    (async () => {
      await this.initDatabase();
    })();
  }

  private async initDatabase() {
    DBService.db = new JsonDB(
      new Config(DATABASE_TODO.DB_NAME, true, true, '/'),
    );
    try {
      await DBService.db.getData(DATABASE_TODO.USER);
      await DBService.db.getData(DATABASE_TODO.TODO);
    } catch (err) {
      await DBService.db.push(DATABASE_TODO.USER, []);
      await DBService.db.push(DATABASE_TODO.TODO, []);
    }
  }

  async findAll<T>(tableName: string): Promise<T[]> {
    return DBService.db.getData(tableName);
  }

  async findOne<T>(tableName: string, id: string): Promise<T> {
    const founds = (await DBService.db.getData(tableName)) as T[];
    const found = founds.find((v: any) => v.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create<T>(
    tableName: string,
    id: string,
    createData: T,
  ): Promise<string> {
    const founds = await this.findAll(tableName);
    try {
      const newData = { id, ...createData };
      founds.push(newData);
      await DBService.db.push(tableName, founds, true);
      return id;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async update<T>(tableName: string, id: string, updateData: T) {
    const founds = await this.findAll(tableName);
    const findIndex = founds.findIndex((v: any) => v.id === id);

    if (findIndex === -1) throw new NotFoundException();

    try {
      const originData = await DBService.db.getData(
        `${tableName}[${await DBService.db.getIndex(tableName, id)}]`,
      );
      const updatedData = Object.assign(originData, updateData);
      DBService.db.push(
        `${tableName}[${await DBService.db.getIndex(tableName, id)}]`,
        updatedData,
        true,
      );
      return updatedData;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async deleteOne(tableName: string, id: string) {
    const founds = await this.findAll(tableName);
    const findIndex = founds.findIndex((v: any) => v.id === id);
    if (findIndex === -1) throw new NotFoundException();

    DBService.db.delete(`${tableName}[${findIndex}]`);
    return true;
  }
}
