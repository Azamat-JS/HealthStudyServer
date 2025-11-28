import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>){}

    async getAllUsers(): Promise<UsersEntity[]> {
        return this.usersRepo.find();
    }

    async getAllTeachers(): Promise<UsersEntity[]> {
        return this.usersRepo.find({ where: { role: 'teacher' } });
    }

    async getAllAssistants(): Promise<UsersEntity[]> {
        return this.usersRepo.find({ where: { role: 'assistant' } });
    }
}
