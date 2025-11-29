import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResendCodeDto, UpdateUserDto, VerifyDto } from '../../packages/db/dtos/users.dto';
import { JwtAuthGuard } from '../../packages/guards/jwt.guard';
import { Request } from 'express';

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

  @Post('application/create')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginDto: LoginDto) {
    console.log(loginDto);
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
    console.log(verifyDto);
    return this.usersService.verifyPhone(verifyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req: Request & { user: { id: string } }) {
    const userId = req.user.id;
    return this.usersService.getProfile(userId);
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
