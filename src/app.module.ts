import { Module } from '@nestjs/common';
import { QuestionsModule } from './questions/questions.module';
import { DatabaseModule } from './database/database.module';
import { AnswersModule } from './answers/answers.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authetication/auth.module';
import { RoomsModule } from './rooms/rooms.module';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    QuestionsModule,
    DatabaseModule,
    AnswersModule,
    UsersModule,
    AuthModule,
    RoomsModule,
    PlayersModule,
  ],
  controllers: [],
  providers: [UsersService],
})
export class AppModule {}
