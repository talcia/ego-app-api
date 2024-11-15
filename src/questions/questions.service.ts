import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class QuestionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.question.findMany();
  }
}
