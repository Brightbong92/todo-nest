import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbService } from 'src/db.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DbService],
})
export class AuthModule {}
