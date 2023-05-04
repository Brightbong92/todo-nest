import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db.service';
import { DATABASE } from '../constants';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DBService) {}

  async create(createTodoDto: CreateTodoDto): Promise<string> {
    const id = uuidv4();
    return await this.dbService.create(DATABASE.TODO, id, createTodoDto);
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
