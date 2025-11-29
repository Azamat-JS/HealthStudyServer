import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AssignmentLevelsService } from './assignment_levels.service';
import { CreateAssignmentLevelDto, UpdateAssignmentLevelDto } from '../../packages/db/dtos/assignment_levels.dto';

@Controller('assignmentlevels')
export class AssignmentLevelsController {
  constructor(private readonly assignmentLevelsService: AssignmentLevelsService) {}

  @Post('create/:assignmentId')
  createAssignmentLevel(@Param('assignmentId') assignmentId: string, @Body() createAssignmentLevelDto: CreateAssignmentLevelDto) {
    return this.assignmentLevelsService.createAssignmentLevel( assignmentId, createAssignmentLevelDto);
  }

  @Get('all/:assignmentId')
  getAllAssignmentLevels(@Param('assignmentId') assignmentId: string) {
    return this.assignmentLevelsService.getAllAssignmentLevels(assignmentId);
  }

  @Put('edit/:id')
  editAssignmentLevel(@Param('id') id: string, @Body() updateAssignmentLevelDto: UpdateAssignmentLevelDto) {
    return this.assignmentLevelsService.editAssignmentLevel(id, updateAssignmentLevelDto);
  }

  @Delete('delete/:id')
  deleteAssignmentLevel(@Param('id') id: string) {
    return this.assignmentLevelsService.deleteAssignmentLevel(id);
  }
}
