import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from '../../packages/db/dtos/assignments.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post('create')
  createAssignment(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.createAssignment(createAssignmentDto);
  }

  @Get('all/:moduleId')
  getAllAssignments(@Param('moduleId') moduleId: string) {
    return this.assignmentsService.getAllAssignments(moduleId);
  }

  @Put('edit/:id')
  editAssignment(@Param('id') id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.editAssignment(id, updateAssignmentDto);
  }
}
