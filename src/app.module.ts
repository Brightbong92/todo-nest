import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [UserModule, TodoModule, AuthModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
