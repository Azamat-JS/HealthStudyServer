import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AssignmentTypesService } from './assignment_types.service';
import { CreateAssignmentTypeDto, UpdateAssignmentTypeDto } from '../../packages/db/dtos/assignment_types.dto';

@Controller('assignmenttypes')
export class AssignmentTypesController {
  constructor(private readonly assignmentTypesService: AssignmentTypesService) {}

  @Post('create')
  createAssignmentType(@Body() createAssignmentTypeDto: CreateAssignmentTypeDto) {
    return this.assignmentTypesService.createAssignmentType(createAssignmentTypeDto);
  }

  @Get('all/:moduleId')
  getAllAssignmentTypes(@Param('moduleId') moduleId: string) {
    return this.assignmentTypesService.getAllAssignmentTypes(moduleId);
  }

  @Put('edit/:id')
  editAssignmentType(@Param('id') id: string, @Body() updateAssignmentTypeDto: UpdateAssignmentTypeDto) {
    return this.assignmentTypesService.editAssignmentType(id, updateAssignmentTypeDto);
  }
}
