import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JsonDBService } from 'src/jsondb.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JsonDBService],
})
export class AuthModule {}
