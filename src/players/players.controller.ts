import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { JwtAuthGuard } from 'src/authetication/auth.guard';

@Controller('players')
export class PlayersController {
  constructor(private readonly playerService: PlayersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('room/:id')
  findByRoomCode(@Param('id') id: string) {
    return this.playerService.findByRoomCode(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('id')
  deletePlayer(@Param('id') id: string) {
    return this.playerService.deletePlayer(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('id')
  acceptPlayer(@Param('id') id: string) {
    return this.playerService.acceptPlayer(+id);
  }
}
