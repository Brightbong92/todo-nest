import { Config, JsonDB } from 'node-json-db';
import { DATABASE2 } from 'src/constants';
import { Board } from './entities/board.entity';
import { NotFoundException } from '@nestjs/common';

export class BoardRepository {
  private db: JsonDB;
  constructor() {
    (async () => {
      this.initDatabase();
    })();
  }

  async initDatabase() {
    this.db = new JsonDB(new Config(DATABASE2.DB_NAME, true, true, '/'));
    try {
      await this.db.getData(DATABASE2.BOARD);
    } catch (err) {
      await this.db.push(DATABASE2.BOARD, []);
    }
  }

  async findAll() {
    return await this.db.getData(DATABASE2.BOARD);
  }

  async findOne(id: number) {
    const founds = (await this.db.getData(DATABASE2.BOARD)) as Board[];
    const found = founds.find((v) => v.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }
}
