import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto, UpdateteOrganizationDto } from '../../packages/db/dtos/organization.dto';

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }


    @Post('create')
    createOrganization(@Body() createOrganizationDto: CreateOrganizationDto) {
      return this.organizationService.createOrganization(createOrganizationDto);
    }
  
    @Get('all')
    getAllOrganizations() {
      return this.organizationService.getAllOrganizations();
    }
  
    @Get('get/:id')
    getOrganization(@Param('id') id:string) {
      return this.organizationService.getOrganization(id);
    }
  
    @Put('edit/:id')
    editOrganization(@Param('id') id:string, @Body() updateOrganizationDto: UpdateteOrganizationDto) {
      return this.organizationService.editOrganization(id, updateOrganizationDto);
    }

    @Delete('delete/:id')
    deleteOrganization(@Param('id') id:string) {
      return this.organizationService.deleteOrganization(id);
    }
}
