import { Controller, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('all/teachers')
  getAllTeachers() {
    return this.usersService.getAllTeachers();
  }

  @Get('all/assistants')
  getAllAssistants() {
    return this.usersService.getAllAssistants();
  }
  
  @Post('create')
  createUser() {
  }

  @Post('login')
  loginUser() {
  }
  
  @Post('logout')
  logoutUser() {
  }

  @Post('forgotpassword')
  forgotPassword() {
  }

  @Post('reset-password')
  resetPassword() {
  }

  @Get('me')
  getProfile() {
  }

  @Get('number')
  getUserNumber() {
  }

  @Put('edit/:id')
  editUser() {
  }
}
