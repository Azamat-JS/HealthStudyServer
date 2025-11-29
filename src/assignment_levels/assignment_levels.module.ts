import { Module } from '@nestjs/common';
import { AssignmentLevelsService } from './assignment_levels.service';
import { AssignmentLevelsController } from './assignment_levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentEntity } from '../../packages/db/entities/assignments.entity';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AssignmentLevelEntity } from '../../packages/db/entities/assignment_levels.entity';


@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([AssignmentLevelEntity, AssignmentEntity]),
  ],
  controllers: [AssignmentLevelsController],
  providers: [AssignmentLevelsService],
})
export class AssignmentLevelsModule { }
