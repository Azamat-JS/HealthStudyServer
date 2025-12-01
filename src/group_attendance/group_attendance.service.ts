import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAttendanceEntity } from '../../packages/db/entities/group_attendance.entity';
import { Repository } from 'typeorm';
import { CreateGroupAttendanceDto, UpdateGroupAttendanceDto } from '../../packages/db/dtos/group_attendance.dto';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';
import { GroupEntity } from '../../packages/db/entities/group.entity';
import { UsersEntity } from '../../packages/db/entities/users.entity';

@Injectable()
export class GroupAttendanceService {
    constructor(
        @InjectRepository(GroupAttendanceEntity) private groupAttendanceRepo: Repository<GroupAttendanceEntity>,
        @InjectRepository(ModuleEntity) private moduleRepo: Repository<ModuleEntity>,
        @InjectRepository(GroupEntity) private groupRepo: Repository<GroupEntity>,
        @InjectRepository(UsersEntity) private studentRepo: Repository<UsersEntity>
    ) { }

    async createAttendanceRecord(createGroupAttendanceDto: CreateGroupAttendanceDto): Promise<GroupAttendanceEntity> {
        const { module_id, group_id, student_id, lesson_id } = createGroupAttendanceDto;

        const module = await this.moduleRepo.findOne({ where: { id: module_id } });
        if (!module) {
            throw new Error('Module not found');
        }

        const group = await this.groupRepo.findOne({ where: { id: group_id } });
        if (!group) {
            throw new Error('Group not found');
        }

        const student = await this.studentRepo.findOne({ where: { id: student_id } });
        if (!student) {
            throw new Error('Student not found');
        }

        // const lesson = await this.lessonRepo.findOne({ where: { id: lesson_id } });
        // if (!lesson) {
        //     throw new Error('Lesson not found');
        // }
        const attendanceRecord = this.groupAttendanceRepo.create({
            ...createGroupAttendanceDto,
            module: module,
            group: group,
            student: student,
            lesson: lesson_id,
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
        const student = await this.studentRepo.findOne({ where: { id: studentId } });
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        return this.groupAttendanceRepo.find({ where: { student: { id: studentId } } });
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
