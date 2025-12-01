import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../../packages/db/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from '../../packages/db/dtos/group.dto';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { OrganizationEntity } from '../../packages/db/entities/organization.entity';
import { ModuleEntity } from '../../packages/db/entities/modules.entity';

@Injectable()
export class GroupsService {
    constructor(@InjectRepository(GroupEntity) private groupsRepo: Repository<GroupEntity>) { }

async createGroup(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
    const allGroups = await this.groupsRepo.count();
    const sequence = allGroups + 1;

    const {
        organization_id,
        teacher_id,
        assistant_id,
        module_id,
        room_id,
        ...rest
    } = createGroupDto;

    const organization = await this.groupsRepo.manager.findOne(OrganizationEntity, {
        where: { id: organization_id },
    });

    if (!organization) {
        throw new NotFoundException('Organization not found');
    }

    const teacher = await this.groupsRepo.manager.findOne(UsersEntity, {
        where: { id: teacher_id },
    });

    if (!teacher) {
        throw new NotFoundException('Teacher not found');
    }

    const assistant = assistant_id
        ? await this.groupsRepo.manager.findOne(UsersEntity, { where: { id: assistant_id } })
        : null;

    if (assistant_id && !assistant) {
        throw new NotFoundException('Assistant not found');
    }

    const module = await this.groupsRepo.manager.findOne(ModuleEntity, {
        where: { id: module_id },
    });

    if (!module) {
        throw new NotFoundException('Module not found');
    }

    const group = this.groupsRepo.create({
        ...rest,
        teacher,
        assistant,        
        module,          
        room_id,         
        sequence,
        organization,     
    });

    return this.groupsRepo.save(group);
}


    async getAllGroups(): Promise<GroupEntity[]> {
        return this.groupsRepo.find();
    }
    // async getAllGroupsByTeacherOrAssistant(userId: string): Promise<GroupEntity[]> {
    //     return this.groupsRepo.find({
    //       where: [
    //         { teacher: { id: userId } },
    //         { assistant: { id: userId } },
    //       ],
    //         relations: ['teacher', 'assistant'],
    //     });
    //   }
}
