import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';
import { Repository } from 'typeorm';
import { CreateModuleDto, UpdateModuleDto } from '../../packages/db/dtos/modules.dto';

@Injectable()
export class ModulesService {
    constructor(@InjectRepository(ModuleEntity) private modulesRepo: Repository<ModuleEntity>) { }
    async createModule(createModuleDto: CreateModuleDto): Promise<ModuleEntity | string> {
        try {
            const module = this.modulesRepo.create({
                ...createModuleDto,
            });
            await this.modulesRepo.save(module);
            return module;
        } catch (error) {
            throw new Error('Error creating module: ' + error.message);
        }
    }

    async getAllModules(courseId: string): Promise<ModuleEntity[]> {
        try {
            return await this.modulesRepo.find({ where: { course: { id: courseId } } });
        } catch (error) {
            throw new Error('Error fetching modules: ' + error.message);
        }
    }

    async editModule(id: string, updateModuleDto: UpdateModuleDto): Promise<ModuleEntity | string> {
        try {
            const module = await this.modulesRepo.findOne({ where: { id } });
            if (!module) {
                return 'Module not found';
            }
            Object.assign(module, updateModuleDto);
            return this.modulesRepo.save(module);
        } catch (error) {
            throw new Error('Error updating module: ' + error.message);
        }
    }
}
