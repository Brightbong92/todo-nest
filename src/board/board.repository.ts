import { DATABASE_BOARD } from 'src/constants';
import { Board } from './entities/board.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { JsonDBService } from 'src/jsondb.service';

@Injectable()
export class BoardRepository {
  constructor(private readonly dbService: JsonDBService) {}

  async findAll() {
    return await this.dbService.getInstance().getData('/board');
  }

  async findOne(id: number) {
    const founds = (await this.dbService
      .getInstance()
      .getData(DATABASE_BOARD.BOARD)) as Board[];
    const found = founds.find((v) => v.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async create(createData: CreateBoardDto) {
    const founds = await this.dbService
      .getInstance()
      .getData(DATABASE_BOARD.BOARD);
    try {
      const newData = { id: founds.length + 1, ...createData };
      await this.dbService
        .getInstance()
        .push(DATABASE_BOARD.BOARD, [...founds, newData]);

      return newData;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateData: UpdateBoardDto) {
    const founds = await this.findAll();
    const findIndex = founds.findIndex((v) => v.id === id);
    if (findIndex === -1) throw new NotFoundException();

    try {
      const originData = await this.dbService
        .getInstance()
        .getData(
          `${DATABASE_BOARD.BOARD}[${await this.dbService
            .getInstance()
            .getIndex(DATABASE_BOARD.BOARD, id)}]`,
        );

      const updatedData = Object.assign(originData, updateData);
      this.dbService
        .getInstance()
        .push(
          `${DATABASE_BOARD.BOARD}[${await this.dbService
            .getInstance()
            .getIndex(DATABASE_BOARD.BOARD, id)}]`,
          updatedData,
          true,
        );

      return updatedData;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: number) {
    const founds = await this.findAll();
    const findIndex = founds.findIndex((v) => v.id === id);
    if (findIndex === -1) throw new NotFoundException();
    try {
      this.dbService
        .getInstance()
        .delete(`${DATABASE_BOARD.BOARD}[${findIndex}]`);
      return true;
    } catch (err) {
      return false;
    }
  }
}
