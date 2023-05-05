import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { JsonDBService } from 'src/jsondb.service';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, JsonDBService],
})
export class BoardModule {}
