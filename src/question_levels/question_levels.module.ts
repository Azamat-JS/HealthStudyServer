import { Module } from '@nestjs/common';
import { QuestionLevelsService } from './question_levels.service';
import { QuestionLevelsController } from './question_levels.controller';
import { QuestionLevelsEntity } from '../../packages/db/entities/question_levels.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigifyModule } from '@itgorillaz/configify';
import { CoursesEntity } from '../../packages/db/entities/courses.entity';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([QuestionLevelsEntity, CoursesEntity]),
  ],
  controllers: [QuestionLevelsController],
  providers: [QuestionLevelsService],
})
export class QuestionLevelsModule { }
