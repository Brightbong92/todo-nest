import { Injectable } from '@nestjs/common';
import { DBService } from '../db.service';
import { DATABASE } from '../constants';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DBService) {}

  async create(createTodoDto: CreateTodoDto): Promise<string> {
    return await this.dbService.create(DATABASE.TODO, createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return await this.dbService.findAll<Todo>(DATABASE.TODO);
  }

  async findOne(id: string): Promise<Todo> {
    return await this.dbService.findOne<Todo>(DATABASE.TODO, id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.dbService.update(DATABASE.TODO, id, updateTodoDto);
  }

  async deleteOne(id: string) {
    return await this.dbService.deleteOne(DATABASE.TODO, id);
  }
}
