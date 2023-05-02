import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateUserDTO extends PartialType(User) {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    required: true,
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: '홍길동',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'password',
    description: '유저 비밀번호',
    required: true,
  })
  @IsString()
  readonly password: string;
}
