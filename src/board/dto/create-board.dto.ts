import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({
    example: '게시판의 제목을 등록해요.',
    description: '제목',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '게시판의 상세내용을 등록해요',
    description: '상세내용',
    required: true,
  })
  @IsString()
  content: string;

  createdAt: Date;
}
