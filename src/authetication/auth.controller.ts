import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const result = await this.authService.login(loginUserDto);
      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Post('/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const result = await this.authService.register(registerUserDto);
      return result;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
