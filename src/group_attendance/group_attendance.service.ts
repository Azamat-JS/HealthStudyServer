import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAttendanceEntity } from '../../packages/db/entities/group_attendance.entity';
import { Repository } from 'typeorm';
import { CreateGroupAttendanceDto, UpdateGroupAttendanceDto } from '../../packages/db/dtos/group_attendance.dto';

@Injectable()
export class GroupAttendanceService {
    constructor(@InjectRepository(GroupAttendanceEntity) private groupAttendanceRepo: Repository<GroupAttendanceEntity>){}

    async createAttendanceRecord(createGroupAttendanceDto: CreateGroupAttendanceDto): Promise<GroupAttendanceEntity> {
        const allRecords = await this.groupAttendanceRepo.count();
        const sequence = allRecords + 1;
        const attendanceRecord = this.groupAttendanceRepo.create({
            ...createGroupAttendanceDto,
        });
        return this.groupAttendanceRepo.save(attendanceRecord);
    }

    async getAllAttendanceRecords(): Promise<GroupAttendanceEntity[]> {
        return this.groupAttendanceRepo.find();
    }

    async getAllAttendanceRecordsByLesson(lessonId: string): Promise<GroupAttendanceEntity[]> {
        return this.groupAttendanceRepo.find({ where: { lesson: lessonId } });
    }

    async getAllAttendanceRecordsByGroupAndStudent(studentId: string): Promise<GroupAttendanceEntity[]> {
        return this.groupAttendanceRepo.find({ where: { student: {id: studentId} } });
    }

    async updateAttendanceRecord(id: string, updateGroupAttendanceDto: UpdateGroupAttendanceDto): Promise<GroupAttendanceEntity | string> {
        const attendanceRecord = await this.groupAttendanceRepo.findOne({ where: { id } });
        if (!attendanceRecord) {
            return 'Attendance record not found';
        }
        Object.assign(attendanceRecord, updateGroupAttendanceDto);
        return this.groupAttendanceRepo.save(attendanceRecord);
    }
}
