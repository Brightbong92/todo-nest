import { Injectable } from '@nestjs/common';
import { Config, JsonDB } from 'node-json-db';
import { DATABASE_BOARD } from './constants';

@Injectable()
export class JsonDBService {
  private static instance: JsonDB;
  private static readonly fileName = DATABASE_BOARD.DB_NAME;
  private static readonly autoSave = true;

  // Single Tone Pattern
  constructor() {
    (async () => {
      if (!JsonDBService.instance) {
        JsonDBService.instance = new JsonDB(
          new Config(JsonDBService.fileName, JsonDBService.autoSave, true, '/'),
        );
        try {
          await JsonDBService.instance.getData(DATABASE_BOARD.USER);
          await JsonDBService.instance.getData(DATABASE_BOARD.BOARD);
        } catch (err) {
          JsonDBService.instance.push(DATABASE_BOARD.USER, []);
          JsonDBService.instance.push(DATABASE_BOARD.BOARD, []);
        }
      }
    })();
  }

  public getInstance(): JsonDB {
    return JsonDBService.instance;
  }
}
