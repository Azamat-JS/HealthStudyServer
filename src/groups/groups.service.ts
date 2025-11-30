import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupEntity } from '../../packages/db/entities/group.entity';
import { Repository } from 'typeorm';
import { CreateGroupDto } from '../../packages/db/dtos/group.dto';

@Injectable()
export class GroupsService {
    constructor(@InjectRepository(GroupEntity) private groupsRepo: Repository<GroupEntity>){}

    async createGroup(createGroupDto: CreateGroupDto): Promise<GroupEntity> {
        const group = this.groupsRepo.create(createGroupDto);
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
