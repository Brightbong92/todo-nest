import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async findAll() {
    return await this.boardRepository.findAll();
  }

  async findOne(id: number) {
    return await this.boardRepository.findOne(id);
  }

  async create(createData: CreateBoardDto) {
    createData.createdAt = new Date();
    return await this.boardRepository.create(createData);
  }

  async update(id: number, updateData: UpdateBoardDto) {
    updateData.updatedAt = new Date();
    return await this.boardRepository.update(id, updateData);
  }

  async delete(id: number) {
    return await this.boardRepository.delete(id);
  }
}
