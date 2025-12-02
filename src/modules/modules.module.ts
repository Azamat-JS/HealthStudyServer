import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';
import { CoursesEntity } from '../../packages/db/entities/courses.entity';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([ModuleEntity, CoursesEntity]),
  ],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule { }
