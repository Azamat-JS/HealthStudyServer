import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from '../../packages/db/dtos/courses.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  @Post('create')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get('all')
  getAllCourses() {
    return this.coursesService.getAllCourses();
  }


  @Put('edit/:id')
  editCourse(@Param('id') id:string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.editCourse(id, updateCourseDto);
  }

  @Delete('delete/:id')
  deleteCourse(@Param('id') id:string) {
    return this.coursesService.deleteCourse(id);
  }
}
