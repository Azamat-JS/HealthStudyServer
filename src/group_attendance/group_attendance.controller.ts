import { Controller } from '@nestjs/common';
import { GroupAttendanceService } from './group_attendance.service';

@Controller('group-attendance')
export class GroupAttendanceController {
  constructor(private readonly groupAttendanceService: GroupAttendanceService) {}
}
