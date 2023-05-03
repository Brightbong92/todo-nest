import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    example: '한강가기',
    description: '제목',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '맛있는거 먹기',
    description: '상세내용',
    required: true,
  })
  @IsString()
  description: string;
  createdAt: Date;
}
