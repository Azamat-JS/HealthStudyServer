import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentLevelEntity } from '../../packages/db/entities/assignment_levels.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentLevelDto, UpdateAssignmentLevelDto } from '../../packages/db/dtos/assignment_levels.dto';
import { AssignmentEntity } from '../../packages/db/entities/assignments.entity';

@Injectable()
export class AssignmentLevelsService {
    constructor(
        @InjectRepository(AssignmentLevelEntity) private assignmentLevelRepo: Repository<AssignmentLevelEntity>,
        @InjectRepository(AssignmentEntity) private assignmentRepo: Repository<AssignmentEntity>,
    ) { }

    async createAssignmentLevel(assignmentId: string, createAssignmentLevelDto: CreateAssignmentLevelDto): Promise<AssignmentLevelEntity> {
        try {
            const assignment = await this.assignmentRepo.findOne({ where: { id: assignmentId } });
            if (!assignment) {
                throw new Error('Assignment not found');
            }
            const assignmentLevel = this.assignmentLevelRepo.create(createAssignmentLevelDto);
            await this.assignmentLevelRepo.save(assignmentLevel);
            return assignmentLevel;
        } catch (error) {
            throw new Error('Error creating assignment level: ' + error.message);
        }
    }

    async getAllAssignmentLevels(assignmentId: string): Promise<AssignmentLevelEntity[]> {
        try {
            return await this.assignmentLevelRepo.find({ where: { assignment: { id: assignmentId } } });
        } catch (error) {
            throw new Error('Error fetching assignment levels: ' + error.message);
        }
    }

    async editAssignmentLevel(id: string, updateAssignmentLevelDto: UpdateAssignmentLevelDto): Promise<AssignmentLevelEntity | string> {
        try {
            const assignmentLevel = await this.assignmentLevelRepo.findOne({ where: { id } });
            if (!assignmentLevel) {
                return 'Assignment level not found';
            }
            Object.assign(assignmentLevel, updateAssignmentLevelDto);
            return this.assignmentLevelRepo.save(assignmentLevel);
        } catch (error) {
            throw new Error('Error updating assignment level: ' + error.message);
        }
    }

    async deleteAssignmentLevel(id: string): Promise<string> {
        try {
            const assignmentLevel = await this.assignmentLevelRepo.findOne({ where: { id } });
            if (!assignmentLevel) {
                return 'Assignment level not found';
            }
            await this.assignmentLevelRepo.remove(assignmentLevel);
            return 'Assignment level deleted successfully';
        } catch (error) {
            throw new Error('Error deleting assignment level: ' + error.message);
        }
    }
}
