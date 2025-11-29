import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;
}

export class UpdateModuleDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;
}