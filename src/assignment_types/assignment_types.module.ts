import { Module } from '@nestjs/common';
import { AssignmentTypesService } from './assignment_types.service';
import { AssignmentTypesController } from './assignment_types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigifyModule } from '@itgorillaz/configify';
import { AssignmentTypesEntity } from '../../packages/db/entities/assignment_types.entity';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';

@Module({
    imports: [
      ConfigifyModule.forRootAsync(),
      TypeOrmModule.forFeature([AssignmentTypesEntity, ModuleEntity]),
    ],
  controllers: [AssignmentTypesController],
  providers: [AssignmentTypesService],
})
export class AssignmentTypesModule {}
