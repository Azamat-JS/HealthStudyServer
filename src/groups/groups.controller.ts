import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { create } from 'domain';
import { CreateGroupDto } from '../../packages/db/dtos/group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post('create')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Get('all')
  getAllGroups() {
    return this.groupsService.getAllGroups();
  }

  // @Get('all/byteacherOrAssisstant/:userId')
  // getAllGroupsByTeacherOrAssistant(@Param('userId') userId: string) {
  //   return this.groupsService.getAllGroupsByTeacherOrAssistant(userId);
  // }
}
