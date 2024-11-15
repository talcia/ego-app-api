import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/authetication/auth.guard';
import { CreateRoomDto } from './dto/create-room.dto';

@Controller('room')
export class RoomsController {
  constructor(private readonly roomService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    console.log('szukam po id');
    console.log(id);
    return this.roomService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() room: CreateRoomDto, @Request() req: Request & { user: any }) {
    return this.roomService.create(room, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/join')
  joinRoom(@Param('id') id: string, @Request() req: Request & { user: any }) {
    return this.roomService.joinRoom(id, req.user.id);
  }
}
