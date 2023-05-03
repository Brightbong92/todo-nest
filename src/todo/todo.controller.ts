import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
@ApiTags('TODO API')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'TODO 생성 API', description: 'TODO를 생성' })
  @ApiCreatedResponse({
    description: 'TODO를 생성',
    schema: {
      example: { success: true },
    },
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    createTodoDto.createdAt = new Date();
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'TODO 리스트 조회 API',
    description: 'TODO 리스트를 조회',
  })
  @ApiCreatedResponse({
    description: 'TODO 리스트를 조회',
  })
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'TODO 단건 조회 API',
    description: 'TODO 단건 조회',
  })
  @ApiCreatedResponse({
    description: 'TODO 단건 조회',
    schema: {
      example: { title: '잠자기', description: '깊게잠들기' },
    },
  })
  async findOne(@Param('id') id: string) {
    return await this.todoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'TODO 수정 API',
    description: 'TODO 수정',
  })
  @ApiCreatedResponse({
    description: 'TODO 수정',
    schema: {
      example: { title: '제목을 변경했어요', description: '내용도 변경했어요' },
    },
  })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    updateTodoDto.updatedAt = new Date();
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'TODO 삭제 API',
    description: 'TODO 삭제',
  })
  @ApiCreatedResponse({
    description: 'TODO 삭제',
    schema: {
      example: { success: true },
    },
  })
  delete(@Param('id') id: string) {
    return this.todoService.deleteOne(id);
  }
}
