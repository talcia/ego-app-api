import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { DatabaseModule } from 'src/database/database.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [RoomsService, UsersService],
  controllers: [RoomsController],
})
export class RoomsModule {}
