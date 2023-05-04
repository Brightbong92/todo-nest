import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { DATABASE2 } from 'src/constants';

@Injectable()
export class UserRepository {
  private db: JsonDB;

  constructor() {
    (async () => {
      await this.initDatabase();
    })();
  }

  private async initDatabase() {
    this.db = new JsonDB(new Config(DATABASE2.DB_NAME, true, true, '/'));
    try {
      await this.db.getData(DATABASE2.USER);
    } catch (err) {
      await this.db.push(DATABASE2.USER, []);
    }
  }
}
