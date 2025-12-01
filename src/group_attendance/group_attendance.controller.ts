import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GroupAttendanceService } from './group_attendance.service';
import { create } from 'domain';
import { CreateGroupAttendanceDto, UpdateGroupAttendanceDto } from '../../packages/db/dtos/group_attendance.dto';

@Controller('group-attendance')
export class GroupAttendanceController {
  constructor(private readonly groupAttendanceService: GroupAttendanceService) {}

  @Post('create')
  async createAttendanceRecord(@Body() createGroupAttendanceDto: CreateGroupAttendanceDto) {
    return this.groupAttendanceService.createAttendanceRecord(createGroupAttendanceDto);
  }

  @Get('all/:groupId')
  async getAllAttendanceRecords() {
    return this.groupAttendanceService.getAllAttendanceRecords();
  }

  @Get('all/bylesson/:lessonId')
  async getAllAttendanceRecordsByLesson(@Param('lessonId') lessonId: string) {
    return this.groupAttendanceService.getAllAttendanceRecordsByLesson(lessonId);
  }

  @Get('all/bygroupstudent/:studentId')
  async getAllAttendanceRecordsByGroupAndStudent(@Param('studentId') studentId: string) {
    return this.groupAttendanceService.getAllAttendanceRecordsByGroupAndStudent(studentId);
  }

  @Put('update/:id')
  async updateAttendanceRecord(
    @Param('id') id: string,
    @Body() updateGroupAttendanceDto: UpdateGroupAttendanceDto,
  ) {
    return this.groupAttendanceService.updateAttendanceRecord(id, updateGroupAttendanceDto);
  }
}
