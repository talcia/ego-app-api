import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

    const user = await this.databaseService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      throw new NotFoundException('invalid password');
    }

    return {
      token: this.jwtService.sign({ email: email }),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const createdUser = {
      name: registerUserDto.name,
      email: registerUserDto.email,
      photoUrl: registerUserDto.photoUrl,
      password: hashedPassword,
    };

    const user = await this.usersService.create(createdUser);

    return {
      token: this.jwtService.sign({ email: user.email }),
    };
  }
}
