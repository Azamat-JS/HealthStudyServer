
import { IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    access: string;

    @IsNotEmpty()
    @IsNumber()
    step: number;

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @IsNotEmpty()
    @IsString()
    role: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    access?: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsString()
    token?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsOptional()
    @IsString()
    role?: string;
}

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class ForgotPasswordDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsNumber()
    step: number;

    @IsNotEmpty()
    @IsString()
    code: string;
}

export class ResendCodeDto {
    @IsNotEmpty()
    @IsString()
    phone: string;
}

export class VerifyDto {
    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    code: string;
}