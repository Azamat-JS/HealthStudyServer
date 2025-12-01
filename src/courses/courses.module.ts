import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { CoursesEntity } from '../../packages/db/entities/courses.entity';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../packages/db/entities/organization.entity';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([CoursesEntity, OrganizationEntity]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule { }
