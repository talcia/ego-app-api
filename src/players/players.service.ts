import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PlayersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(playerId: number) {
    return this.databaseService.player.findUnique({
      where: { id: playerId },
    });
  }

  async findByRoomCode(roomId: string) {
    return this.databaseService.player.findMany({
      where: {
        roomId: roomId,
      },
    });
  }

  async deletePlayer(playerId: number) {
    return this.databaseService.player.delete({ where: { id: playerId } });
  }

  async acceptPlayer(playerId: number) {
    return this.databaseService.player.update({
      where: { id: playerId },
      data: { status: 'ACCEPTED' },
    });
  }
}
