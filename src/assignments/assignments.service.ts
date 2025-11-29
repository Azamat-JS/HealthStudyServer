import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from '../../packages/db/entities/assignments.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentDto, UpdateAssignmentDto } from '../../packages/db/dtos/assignments.dto';

@Injectable()
export class AssignmentsService {
    constructor(@InjectRepository(AssignmentEntity) private assignmentRepo: Repository<AssignmentEntity>){}

    async createAssignment(createAssignmentDto: CreateAssignmentDto): Promise<AssignmentEntity | string> {
        try {
            const assignment = this.assignmentRepo.create(createAssignmentDto);
            await this.assignmentRepo.save(assignment);
            return assignment;
        } catch (error) {
            throw new Error('Error creating assignment: ' + error.message);
        }
    }

    async getAllAssignments(moduleId: string): Promise<AssignmentEntity[]> {
        try {
            return await this.assignmentRepo.find({ where: { module: { id: moduleId } } });
        } catch (error) {
            throw new Error('Error fetching assignments: ' + error.message);
        }
    }

    async editAssignment(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<AssignmentEntity | string> {
        try {
            const assignment = await this.assignmentRepo.findOne({ where: { id } });
            if (!assignment) {
                return 'Assignment not found';
            }
            Object.assign(assignment, updateAssignmentDto);
            return this.assignmentRepo.save(assignment);
        } catch (error) {
            throw new Error('Error updating assignment: ' + error.message);
        }
    }
}
