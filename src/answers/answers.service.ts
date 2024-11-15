import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AnswersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByQuestionId(questionId: number) {
    return this.databaseService.answer.findMany({
      where: {
        questionId: questionId,
      },
    });
  }
}
