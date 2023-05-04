import { Module } from '@nestjs/common';
import { DBService } from 'src/db.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DBService],
})
export class UserModule {}
