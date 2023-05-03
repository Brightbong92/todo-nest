import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';

@Injectable()
export class AuthService {
  constructor(private readonly dbService: DbService) {}

  async getAuth(): Promise<any> {
    return await this.dbService.findAll('/auth');
  }
}
