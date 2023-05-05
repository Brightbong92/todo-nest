import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { SignInDTO } from './dto/sign-in.dto';

@Controller('auth')
@ApiTags('Auth 유저 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: '회원가입 API', description: '회원가입(=유저생성)' })
  @ApiCreatedResponse({
    description: '회원가입(=유저생성)',
    schema: {
      example: '',
    },
  })
  create(@Body() authCredentialsDto: AuthCredentialsDTO) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인 API', description: '로그인' })
  @ApiCreatedResponse({
    description: '로그인',
    schema: {
      example: 'login success',
    },
  })
  signIn(@Body(ValidationPipe) signInDto: SignInDTO) {
    return this.authService.signIn(signInDto);
  }
}
