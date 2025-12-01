import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../packages/db/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, ForgotPasswordDto, LoginDto, ResendCodeDto, UpdateUserDto, VerifyDto } from '../../packages/db/dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { UserRole, UserStatus } from '../../packages/lib/enums/enum';
import { JwtService } from '@nestjs/jwt';
import { AppConfig } from '../../packages/lib/config/config';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity) private usersRepo: Repository<UsersEntity>,
        private jwtService: JwtService,
        private readonly config: AppConfig
    ) { }

    async getAllUsers(): Promise<UsersEntity[]> {
        return this.usersRepo.find();
    }

    async getAllTeachers(): Promise<UsersEntity[]> {
        return this.usersRepo.find({ where: { role: UserRole.TEACHER } });
    }

    async getAllAssistants(): Promise<UsersEntity[]> {
        return this.usersRepo.find({ where: { role: UserRole.ASSISTANT } });
    }

    async createUser(createUserDto: CreateUserDto): Promise<string | UsersEntity> {
        try {
            const { phone, password } = createUserDto;
            const userExists = await this.usersRepo.findOne({ where: { phone } });
            if (userExists) {
                throw new Error('User with this phone number already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const verificationCode = Math.floor(Math.random() * 10000);
            console.log('Verification Code:', verificationCode);
            const user = this.usersRepo.create({
                ...createUserDto,
                password: hashedPassword,
                role: UserRole.USER,
                access: UserStatus.PENDING,
                code: verificationCode.toString(),
            });
            return await this.usersRepo.save(user);

        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    }

    async loginUser(loginDto: LoginDto): Promise<any> {
        try {
            const user = await this.usersRepo.findOne({
                where: { phone: loginDto.phone }
            });

            if (!user) {
                throw new HttpException("User not found", HttpStatus.NOT_FOUND);
            }

            const isMatch = await bcrypt.compare(loginDto.password, user.password);
            if (!isMatch) {
                throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST);
            }
            
            const payload = {
                id: user.id,
                phone: user.phone,
                role: user.role,
            };
            
            const token = await this.jwtService.signAsync(payload);

            await this.editUser(user.id, {token: token});

            return { token };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new InternalServerErrorException("Login failed");
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

    async getProfile(userId: string): Promise<any> {
        const user = await this.usersRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        return user;
    }

    async getUserNumber(): Promise<any> {
        try {
            const data = await this.usersRepo.count();
            return { data };
        } catch (error) {
            throw new Error('Error fetching user number: ' + error.message);
        }
    }

    async editUser(id: string, updateUserDto: UpdateUserDto): Promise<string | UsersEntity> {
        try {
            const user = await this.usersRepo.findOne({ where: { id } });
            if (user) {
                await this.usersRepo.update(id, updateUserDto);
                const updatedUser = await this.usersRepo.findOne({ where: { id } });
                if (!updatedUser) {
                    return 'User not found';
                }
                return updatedUser;
            } else {
                return 'User not found';
            }
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    }
}
