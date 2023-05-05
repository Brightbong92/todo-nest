import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDTO {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '홍길동',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    example: 'password',
    description: '유저 비밀번호',
    required: true,
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  // 영어랑 숫자만 가능한 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
