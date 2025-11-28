import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResendCodeDto, UpdateUserDto, VerifyDto } from '../../packages/db/dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../packages/lib/enums/enum';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>) { }

    async getAllUsers(): Promise<UsersEntity[]> {
        return this.usersRepo.find();
    }

    async getAllTeachers(): Promise<UsersEntity[]> {
        return this.usersRepo.find({ where: { role: UserRole.TEACHER } });
    }

    async getAllAssistants(): Promise<UsersEntity[]> {
        return this.usersRepo.find({ where: { role: UserRole.ASSISTANT } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<string> {
        try {
            const {phone, password} = createUserDto;
            const userExists = await this.usersRepo.findOne({ where: { phone } });
            if (userExists) {
                return 'User already exists';
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const verificationCode = Math.floor(Math.random() * 10000);
            const user = this.usersRepo.create({
                ...createUserDto,
                password: hashedPassword,
                code: verificationCode.toString(),
            });
            await this.usersRepo.save(user);
            return 'User created';
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async loginUser(loginDto: LoginDto): Promise<string> {
        try {
            const userExists = await this.usersRepo.findOne({ where: { phone: loginDto.phone, password: loginDto.password } });
            if (userExists) {
                return 'User logged in';
            } else {
                return 'Invalid credentials';
            }
        } catch (error) {
            throw new Error('Error logging in: ' + error.message);
        }
    }

    async forgotPassword(forgotDto: ForgotPasswordDto): Promise<string> {
        try {
            const user = await this.usersRepo.findOne({ where: { phone: forgotDto.phone } });
            if (user) {
                // Logic to send reset code would go here
                return 'Password reset code sent';
            } else {
                return 'User not found';
            }
        } catch (error) {
            throw new Error('Error in forgot password: ' + error.message);
        }
    }

    async verifyPhone(verifyDto: VerifyDto): Promise<string> {
        try {
            const user = await this.usersRepo.findOne({ where: { phone: verifyDto.phone, code: verifyDto.code } });
            if (user) {
                return 'Phone verified successfully';
            } else {
                return 'Invalid verification code';
            }
        } catch (error) {
            throw new Error('Error verifying phone: ' + error.message);
        }
    }

    async resendPassword(resendDto: ResendCodeDto): Promise<string> {
       try {
        const user = await this.usersRepo.findOne({ where: { phone: resendDto.phone } });
        if (user) {
            const newCode = Math.floor(Math.random() * 10000);
            user.code = newCode.toString();
            await this.usersRepo.save(user);
            // Logic to send new code would go here
            return 'Verification code resent';
        } else {
            return 'User not found';
        }
       } catch (error) {
        throw new Error('Error resending code: ' + error.message);
       }
    }

    async getProfile(): Promise<string> {
        return 'User profile data';
    }

    async getUserNumber(): Promise<string> {
        return 'Total number of users';
    }

    async editUser(id: string, updateUserDto: UpdateUserDto): Promise<string> {
        try {
            const user = await this.usersRepo.findOne({ where: { id } });
            if (user) {
                await this.usersRepo.update(id, updateUserDto);
                return 'User updated successfully';
            } else {
                return 'User not found';
            }
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }
}
