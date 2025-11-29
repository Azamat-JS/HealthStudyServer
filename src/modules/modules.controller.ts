import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto, UpdateModuleDto } from '../../packages/db/dtos/modules.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post('create')
  createModule(@Body() createModuleDto: CreateModuleDto) {
    return this.modulesService.createModule(createModuleDto);
  }

  @Get('all/:courseId')
  getAllModules(@Param('courseId') courseId: string) {
    return this.modulesService.getAllModules(courseId);
  }

  @Put('edit/:id')
  editModule(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleDto) {
    return this.modulesService.editModule(id, updateModuleDto);
  }
}
