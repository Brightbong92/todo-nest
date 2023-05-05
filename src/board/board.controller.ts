import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('게시판 API')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: '게시글 생성 API', description: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
    schema: {
      example: '',
    },
  })
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  @ApiOperation({
    summary: '게시판 리스트 조회 API',
    description: '게시판 리스트를 조회',
  })
  @ApiCreatedResponse({
    description: '게시판 리스트를 조회',
    type: Board,
  })
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '게시판 단건 조회 API',
    description: '게시판 단건 조회',
  })
  @ApiCreatedResponse({
    description: '게시판 단건 조회',
    schema: {
      example: { title: '게시글 제목이에요', content: '게시글 내용이에요' },
    },
  })
  async findOne(@Param('id') id: number) {
    return await this.boardService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '게시글 수정 API',
    description: '게시글 수정',
  })
  @ApiCreatedResponse({
    description: '게시글 수정',
    schema: {
      example: {
        id: 999,
        title: '오늘은 날씨가 좋네요',
        content: '해가 쨍쨍하네요',
        createdAt: '2023-05-03T11:37:34.181Z',
        updatedAt: '2023-05-04T01:15:10.940Z',
      },
    },
  })
  update(@Param('id') id: number, @Body() updateBaordDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBaordDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '게시글 삭제 API',
    description: '게시글 삭제',
  })
  @ApiCreatedResponse({
    description: '게시글 삭제',
    schema: {
      example: { success: true },
    },
  })
  delete(@Param('id') id: number) {
    return this.boardService.delete(id);
  }
}
