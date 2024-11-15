import { ConflictException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly usersService: UsersService,
  ) {}

  async findOne(id: string) {
    return this.databaseService.room.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(room: CreateRoomDto, ownerId) {
    const existedRoom = await this.databaseService.room.findUnique({
      where: { id: room.id },
    });

    if (existedRoom) {
      throw new ConflictException('room already exist');
    }

    const user = await this.usersService.findOne(ownerId);

    const createdRoom = await this.databaseService.room.create({
      data: {
        ...room,
        owner: { connect: { id: ownerId } },
      },
    });

    await this.databaseService.player.create({
      data: {
        id: ownerId,
        name: user.name,
        admin: true,
        points: room.initialPoints,
        status: 'ACCEPTED',
        room: { connect: { id: room.id } },
      },
    });

    return createdRoom;
  }

  async joinRoom(id: string, userId: string) {
    const existedRoom = await this.databaseService.room.findUnique({
      where: { id: id },
    });

    if (!existedRoom) {
      throw new ConflictException('room dont exist');
    }

    const user = await this.usersService.findOne(+userId);

    const player = await this.databaseService.player.create({
      data: {
        id: +userId,
        name: user.name,
        admin: true,
        points: existedRoom.initialPoints,
        status: 'ACCEPTED',
        room: { connect: { id: existedRoom.id } },
      },
    });

    return player;
  }
}
