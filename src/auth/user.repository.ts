import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DATABASE_BOARD } from 'src/constants';
import { JsonDBService } from 'src/jsondb.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: JsonDBService) {}

  async findAll() {
    return await this.dbService.getInstance().getData(DATABASE_BOARD.USER);
  }

  async findOne(id: string) {
    const founds = await this.findAll();
    const found = founds.find((v) => v.id === id);
    if (found) return found;
    else return;
  }

  async createUser(createData: AuthCredentialsDTO) {
    try {
      const founds = await this.findAll();
      const newData = { id: createData.email, ...createData };
      await this.dbService
        .getInstance()
        .push(DATABASE_BOARD.USER, [...founds, newData]);
      return newData;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
