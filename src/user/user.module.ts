import { Module } from '@nestjs/common';
import { DbService } from 'src/db.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService],
})
export class UserModule {}
