import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { SignInDTO } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user-decoratoer';
import { User } from './entities/user.entity';

@Controller('auth')
@ApiTags('Auth 유저 API')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '회원가입 API', description: '회원가입(=유저생성)' })
  @ApiCreatedResponse({
    description: '회원가입(=유저생성)',
    schema: {
      example: '',
    },
  })
  @Post('/signup')
  create(@Body() authCredentialsDto: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @ApiOperation({ summary: '로그인 API', description: '로그인' })
  @ApiCreatedResponse({
    description: '로그인',
    schema: {
      example: {
        jwt: 'eyJ...blabla',
      },
    },
  })
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) signInDto: SignInDTO,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard())
  @Post('/test')
  test(@GetUser() user: User) {
    // console.log(user);
    return user;
  }
}
