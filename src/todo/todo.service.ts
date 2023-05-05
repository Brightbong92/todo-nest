import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db.service';
import { DATABASE_TODO } from '../constants';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DBService) {}

  async create(createTodoDto: CreateTodoDto): Promise<string> {
    const id = uuidv4();
    return await this.dbService.create(DATABASE_TODO.TODO, id, createTodoDto);
  }

  async findAll(): Promise<Todo[]> {
    return await this.dbService.findAll<Todo>(DATABASE_TODO.TODO);
  }

  async findOne(id: string): Promise<Todo> {
    return await this.dbService.findOne<Todo>(DATABASE_TODO.TODO, id);
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return await this.dbService.update(DATABASE_TODO.TODO, id, updateTodoDto);
  }

  async deleteOne(id: string) {
    return await this.dbService.deleteOne(DATABASE_TODO.TODO, id);
  }
}
