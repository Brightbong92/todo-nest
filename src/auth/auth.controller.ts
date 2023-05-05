import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';

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
  create(@Body() authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인 API', description: '로그인' })
  @ApiCreatedResponse({
    description: '로그인',
    schema: {
      example: {
        jwt: 'eyJ...blabla',
      },
    },
  })
  signIn(
    @Body(ValidationPipe) signInDto: SignInDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
