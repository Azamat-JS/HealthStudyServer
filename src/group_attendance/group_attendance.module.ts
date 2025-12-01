import { Module } from '@nestjs/common';
import { GroupAttendanceService } from './group_attendance.service';
import { GroupAttendanceController } from './group_attendance.controller';

@Module({
  controllers: [GroupAttendanceController],
  providers: [GroupAttendanceService],
})
export class GroupAttendanceModule {}
