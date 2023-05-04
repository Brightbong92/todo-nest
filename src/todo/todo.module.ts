import { Module } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';

@Module({
  controllers: [TodoController],
  providers: [TodoService, DBService],
})
export class TodoModule {}
