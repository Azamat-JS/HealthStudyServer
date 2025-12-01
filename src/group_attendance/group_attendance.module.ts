import { Module } from '@nestjs/common';
import { GroupAttendanceService } from './group_attendance.service';
import { GroupAttendanceController } from './group_attendance.controller';
import { GroupAttendanceEntity } from '../../packages/db/entities/group_attendance.entity';
import { ConfigifyModule } from '@itgorillaz/configify';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigifyModule.forRootAsync(),
    TypeOrmModule.forFeature([GroupAttendanceEntity]),
  ],
  controllers: [GroupAttendanceController],
  providers: [GroupAttendanceService],
})
export class GroupAttendanceModule { }
