import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesEntity } from '../../packages/db/entities/courses.entity';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([CoursesEntity]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
