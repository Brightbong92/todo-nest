import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';

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

  @Post('login')
  @ApiOperation({ summary: '유저 조회 API', description: '유저를 조회' })
  @ApiCreatedResponse({
    description: '유저를 조회',
    // schema: {
    //   example: { success:  },
    // },
  })
  findUsers(@Body() userData: LoginUserDTO) {
    return this.userService.findUser(userData.email);
  }
}
