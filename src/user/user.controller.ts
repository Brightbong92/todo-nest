import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성' })
  @ApiCreatedResponse({
    description: '유저를 생성',
    schema: {
      example: { success: true },
    },
  })
  createUser(@Body() userData: CreateUserDTO) {
    return this.userService.createUser(userData);
  }

  @Get()
  @ApiOperation({ summary: '유저 조회 API', description: '유저를 조회' })
  @ApiCreatedResponse({
    description: '유저를 조회',
    // schema: {
    //   example: { success:  },
    // },
  })
  findUsers() {
    return this.userService.findAll();
  }
}
