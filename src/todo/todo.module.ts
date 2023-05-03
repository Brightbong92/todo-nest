import { Module } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService, DbService],
})
export class TodoModule {}
