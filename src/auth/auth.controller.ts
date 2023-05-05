import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Controller('auth')
@ApiTags('Auth 유저 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: '유저 생성 API', description: '유저 생성' })
  @ApiCreatedResponse({
    description: '유저 생성',
    schema: {
      example: '',
    },
  })
  create(@Body() createUserDto: AuthCredentialsDTO) {
    return this.authService.create(createUserDto);
  }
}
