import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { DATABASE } from 'src/constants';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private readonly dbService: DbService) {}

  async create(createTodoDto: CreateTodoDto) {
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
