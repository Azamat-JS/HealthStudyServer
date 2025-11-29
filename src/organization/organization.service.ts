import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationEntity } from '../../packages/db/entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto, UpdateteOrganizationDto } from '../../packages/db/dtos/organization.dto';

@Injectable()
export class OrganizationService {
    constructor(@InjectRepository(OrganizationEntity) private organizationRepo: Repository<OrganizationEntity>){}

    async createOrganization(createOrganizationDto: CreateOrganizationDto): Promise<string | OrganizationEntity> {
        try {
            const organization = this.organizationRepo.create({
                ...createOrganizationDto,
            });
            await this.organizationRepo.save(organization);
            return organization;
        } catch (error) {
            throw new Error('Error creating organization: ' + error.message);
        }
    }

    async getAllOrganizations(): Promise<OrganizationEntity[]> {
        try {
            return await this.organizationRepo.find();
        } catch (error) {
            throw new Error('Error fetching organizations: ' + error.message);
        }
    }

    async getOrganization(id: string): Promise<OrganizationEntity | string> {
        try {
            const organization = await this.organizationRepo.findOne({ where: { id } });
            if (!organization) {
                return 'Organization not found';
            }
            return organization;
        } catch (error) {
            throw new Error('Error fetching organization: ' + error.message);
        }
    }

    async editOrganization(id: string, updateOrganizationDto: UpdateteOrganizationDto): Promise<OrganizationEntity | string> {
       try {
        const organization = await this.organizationRepo.findOne({ where: { id } });
        if (!organization) {
            return 'Organization not found';
        }
        Object.assign(organization, updateOrganizationDto);
        return this.organizationRepo.save(organization);
       } catch (error) {
        throw new Error('Error updating organization: ' + error.message);
       }
    }

    async deleteOrganization(id: string): Promise<string> {
        try {
            const organization = await this.organizationRepo.findOne({ where: { id } });
            if (!organization) {
                return 'Organization not found';
            }
            await this.organizationRepo.remove(organization);
            return 'Organization deleted successfully';
        } catch (error) {
            throw new Error('Error deleting organization: ' + error.message);
        }
    }
}
