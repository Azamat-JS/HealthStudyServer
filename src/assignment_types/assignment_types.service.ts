import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentTypesEntity } from '../../packages/db/entities/assignment_types.entity';
import { Repository } from 'typeorm';
import { CreateAssignmentTypeDto } from '../../packages/db/dtos/assignment_types.dto';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';

@Injectable()
export class AssignmentTypesService {
    constructor(
        @InjectRepository(AssignmentTypesEntity) private assignmentTypesRepo: Repository<AssignmentTypesEntity>,
        @InjectRepository(ModuleEntity) private assignmentRepo: Repository<ModuleEntity>,
    ) { }

    async createAssignmentType(createAssignmentTypeDto: CreateAssignmentTypeDto): Promise<AssignmentTypesEntity | string> {
        try {
            const module = await this.assignmentRepo.findOne({ where: { id: createAssignmentTypeDto.module_id } });
            if (!module) {
                return 'Assignment not found';
            }
            const assignmentType = this.assignmentTypesRepo.create({
                ...createAssignmentTypeDto,
                module: module,
            });
            await this.assignmentTypesRepo.save(assignmentType);
            return assignmentType;
        } catch (error) {
            throw new Error('Error creating assignment type: ' + error.message);
        }
    }

    async getAllAssignmentTypes(moduleId: string): Promise<AssignmentTypesEntity[]> {
        try {
            return await this.assignmentTypesRepo.find({ where: { module: { id: moduleId } } });
        } catch (error) {
            throw new Error('Error fetching assignment types: ' + error.message);
        }
    }

    async editAssignmentType(id: string, updateAssignmentTypeDto: any): Promise<AssignmentTypesEntity | string> {
        try {
            const assignmentType = await this.assignmentTypesRepo.findOne({ where: { id } });
            if (!assignmentType) {
                return 'Assignment type not found';
            }
            Object.assign(assignmentType, updateAssignmentTypeDto);
            return this.assignmentTypesRepo.save(assignmentType);
        } catch (error) {
            throw new Error('Error updating assignment type: ' + error.message);
        }
    }
}
