import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { create } from 'domain';
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResendCodeDto, UpdateUserDto, VerifyDto } from '../../packages/db/dtos/users.dto';
import { JwtAuthGuard } from '../../packages/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    return this.usersService.loginUser(loginDto);
  }

  @Post('forgotpassword')
  forgotPassword(@Body() forgotDto: ForgotPasswordDto) {
    return this.usersService.forgotPassword(forgotDto);
  }

  @Post('resendpassword')
  resendPassword(@Body() resendDto: ResendCodeDto) {
    return this.usersService.resendPassword(resendDto);
  }

  @Post('verify-phone')
  verifyPhone(@Body() verifyDto: VerifyDto) {
    return this.usersService.verifyPhone(verifyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile() {
    return this.usersService.getProfile();
  }

  @UseGuards(JwtAuthGuard)
  @Get('number')
  getUserNumber() {
    return this.usersService.getUserNumber();
  }

  @Put('edit/:id')
  editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.editUser(id, updateUserDto);
  }
}
