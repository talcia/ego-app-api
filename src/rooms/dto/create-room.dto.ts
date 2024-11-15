import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  id: string;

  @IsNumber()
  initialPoints: number;

  @IsNumber()
  numberOfRounds: number;

  status: 'PENDING';
}
