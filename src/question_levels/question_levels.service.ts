import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionLevelsEntity } from '../../packages/db/entities/question_levels.entity';
import { Repository } from 'typeorm';
import { CoursesEntity } from '../../packages/db/entities/courses.entity';
import { CreateQuestionLevelDto, UpdateQuestionLevelDto } from '../../packages/db/dtos/question_levels.dto';

@Injectable()
export class QuestionLevelsService {
    constructor(
        @InjectRepository(QuestionLevelsEntity) private readonly questionLevelsRepo: Repository<QuestionLevelsEntity>,
        @InjectRepository(CoursesEntity) private readonly coursesRepo: Repository<CoursesEntity>,
    ) { }

    async createQuestionLevel(courseId: string, createLevelDto: CreateQuestionLevelDto) {
        const course = await this.coursesRepo.findOne({ where: { id: courseId } });
        if (!course) {
            throw new Error('Course not found');
        }

        const newLevel = this.questionLevelsRepo.create({ name: createLevelDto.name, course });
        return this.questionLevelsRepo.save(newLevel);
    }

    async getAllQuestionLevels(courseId: string) {
        return this.questionLevelsRepo.find({ where: { course: { id: courseId } } });
    }

    async updateQuestionLevel(levelId: string, updateLevelDto: UpdateQuestionLevelDto) {
        const level = await this.questionLevelsRepo.findOne({ where: { id: levelId } });
        if (!level) {
            throw new Error('Question Level not found');
        }

        level.name = updateLevelDto.name
        return this.questionLevelsRepo.save(level);
    }

    async deleteQuestionLevel(levelId: string) {
        const level = await this.questionLevelsRepo.findOne({ where: { id: levelId } });
        if (!level) {
            throw new Error('Question Level not found');
        }

        return this.questionLevelsRepo.remove(level);
    }
}
