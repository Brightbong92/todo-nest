import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
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
