import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';

@Injectable()
export class AuthService {
  private db: JsonDB;
  private readonly DB_NAME = 'db';
  private readonly TABLE_NAME = 'auth';

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

  getAuth(): string {
    return 'auth';
  }
}
