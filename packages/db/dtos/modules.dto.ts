import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsOptional()
    @IsNumber()
    max_students?: number;

    @IsOptional()
    @IsString()
    is_core?: string;

    @IsNotEmpty()
    @IsUUID()
    course_id: string;

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

    @IsOptional()
    @IsNumber()
    max_students?: number;

    @IsOptional()
    @IsString()
    is_core?: string;

    @IsOptional()
    @IsUUID()
    course_id?: string;
}