import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DATABASE_BOARD } from 'src/constants';
import { CreateUserDTO } from './dto/create-user.dto';
import { JsonDBService } from 'src/jsondb.service';

@Injectable()
export class UserRepository {
  constructor(private readonly dbService: JsonDBService) {}

  async findAll() {
    return await this.dbService.getInstance().getData(DATABASE_BOARD.USER);
  }

  async create(createData: CreateUserDTO) {
    const founds = await this.dbService
      .getInstance()
      .getData(DATABASE_BOARD.USER);
    try {
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
