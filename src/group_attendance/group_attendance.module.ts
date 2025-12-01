import { Module } from '@nestjs/common';
import { GroupAttendanceService } from './group_attendance.service';
import { GroupAttendanceController } from './group_attendance.controller';
import { GroupAttendanceEntity } from '../../packages/db/entities/group_attendance.entity';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { GroupEntity } from '../../packages/db/entities/group.entity';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([GroupAttendanceEntity, UsersEntity, GroupEntity, ModuleEntity]),
  ],
  controllers: [GroupAttendanceController],
  providers: [GroupAttendanceService],
})
export class GroupAttendanceModule { }
