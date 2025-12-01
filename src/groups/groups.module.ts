import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from '../../packages/db/entities/group.entity';
import { OrganizationEntity } from '../../packages/db/entities/organization.entity';

@Module({
    imports: [
      ConfigifyModule.forRootAsync(),
      TypeOrmModule.forFeature([GroupEntity]),
    ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
