import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDTO {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password',
    description: '유저 비밀번호',
    required: true,
  })
  @IsString()
  password: string;
}
