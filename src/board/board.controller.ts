import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entities/board.entity';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user-decoratoer';
import { User } from 'src/user/entities/user.entity';

@ApiTags('게시판 API')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard())
@Controller('board')
export class BoardController {
  private logger = new Logger('BoardController');
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: '게시글 생성 API', description: '게시글 생성' })
  @ApiCreatedResponse({
    description: '게시글 생성',
    schema: {
      example: '',
    },
  })
  create(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    this.logger.verbose(
      `user ${user.name} creating a new board. Payload: ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardService.create(createBoardDto);
  }

  @ApiOperation({
    summary: '게시판 리스트 조회 API',
    description: '게시판 리스트를 조회',
  })
  @ApiCreatedResponse({
    description: '게시판 리스트를 조회',
    type: Board,
  })
  @Get()
  findAll(@GetUser() user: User) {
    this.logger.verbose(`User ${user.name} trying to get all board`);
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
  async findOne(@Param('id') id: number, @GetUser() user: User) {
    this.logger.verbose(`user ${user.name} trying to get a board`);
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
  update(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `user ${user.name} updating a board. Payload: ${JSON.stringify(
        updateBoardDto,
      )}`,
    );
    return this.boardService.update(id, updateBoardDto);
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
  delete(@Param('id') id: number, @GetUser() user: User) {
    this.logger.verbose(`user ${user.name} delete a board`);
    return this.boardService.delete(id);
  }
}
