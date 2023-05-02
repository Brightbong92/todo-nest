import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';

export class CreateUserDTO extends PartialType(User) {
  @IsString()
  readonly email: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly password: string;
}
