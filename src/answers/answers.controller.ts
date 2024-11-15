import { Controller, Get, Param } from '@nestjs/common';
import { AnswersService } from './answers.service';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answerService: AnswersService) {}

  @Get(':id')
  findAllByQuestionId(@Param('id') id: string) {
    return this.answerService.findByQuestionId(+id);
  }
}
