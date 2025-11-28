import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from '../../packages/db/entities/courses.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto, UpdateCourseDto } from '../../packages/db/dtos/courses.dto';

@Injectable()
export class CoursesService {
    constructor(@InjectRepository(CoursesEntity) private coursesRepo: Repository<CoursesEntity>) { }

    async createCourse(createCourseDto: CreateCourseDto): Promise<string | CoursesEntity> {
        try {
            const allCourses = await this.coursesRepo.find();
            const sequence = allCourses.length + 1;
            const course = this.coursesRepo.create({
                ...createCourseDto,
                sequence: sequence,
            });
            await this.coursesRepo.save(course);
            return course;
        } catch (error) {
            throw new Error('Error creating course: ' + error.message);
        }
    }

    async getAllCourses(): Promise<CoursesEntity[]> {
        try {
            return await this.coursesRepo.find({ order: { sequence: 'ASC' } });
        } catch (error) {
            throw new Error('Error fetching courses: ' + error.message);
        }
    }

    async editCourse(id: string, updateCourseDto: UpdateCourseDto): Promise<CoursesEntity | string> {
       try {
        const course = await this.coursesRepo.findOne({ where: { id } });
        if (!course) {
            return 'Course not found';
        }
        Object.assign(course, updateCourseDto);
        return this.coursesRepo.save(course);
         
       } catch (error) {
        throw new Error('Error updating course: ' + error.message);
       }
    }
}
