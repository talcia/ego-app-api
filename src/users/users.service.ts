import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  async create(user: Prisma.UserCreateInput) {
    const existedUser = await this.databaseService.user.findUnique({
      where: { email: user.email },
    });
    if (existedUser) {
      throw new ConflictException('user already exists');
    }
    return this.databaseService.user.create({
      data: user,
    });
  }
}
