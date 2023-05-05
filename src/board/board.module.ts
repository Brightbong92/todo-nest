import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { JsonDBService } from 'src/jsondb.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, JsonDBService],
})
export class BoardModule {}
