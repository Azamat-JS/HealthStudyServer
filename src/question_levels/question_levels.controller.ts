import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { QuestionLevelsService } from './question_levels.service';
import { CreateQuestionLevelDto, UpdateQuestionLevelDto } from '../../packages/db/dtos/question_levels.dto';
import { create } from 'domain';

@Controller('question-levels')
export class QuestionLevelsController {
  constructor(private readonly questionLevelsService: QuestionLevelsService) {}

  @Post('create/:courseId')
  async createQuestionLevel(@Param('courseId') courseId: string, @Body() createLevelDto: CreateQuestionLevelDto){
    return this.questionLevelsService.createQuestionLevel(courseId, createLevelDto);
  }

  @Get('all/:courseId')
  async getAllQuestionLevels(courseId: string) {
    return this.questionLevelsService.getAllQuestionLevels(courseId);
  }

  @Put('update/:levelId')
  async updateQuestionLevel(@Param('levelId') levelId: string, @Body() updateLevelDto: UpdateQuestionLevelDto) {
    return this.questionLevelsService.updateQuestionLevel(levelId, updateLevelDto);
  }

  @Delete('delete/:levelId')
  async deleteQuestionLevel(levelId: string) {
    return this.questionLevelsService.deleteQuestionLevel(levelId);
  }
}
