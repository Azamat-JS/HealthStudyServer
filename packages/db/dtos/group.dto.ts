import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGroupDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsUUID()
    course_id: string;

    @IsNotEmpty()
    @IsUUID()
    teacher_id: string;

    @IsOptional()
    @IsUUID()
    assistant_id?: string;

    @IsNotEmpty()
    @IsUUID()
    room_id: string;

    @IsNotEmpty()
    @IsUUID()
    module_id: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;

    @IsNotEmpty()
    @IsString()
    organization_id: string;

    @IsOptional()
    @IsDateString()
    starting_date?: Date;
}

export class UpdateGroupDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsUUID()
    course_id?: string;

    @IsOptional()
    @IsUUID()
    teacher_id?: string;

    @IsOptional()
    @IsUUID()
    assistant_id?: string;

    @IsOptional()
    @IsUUID()
    room_id?: string;

    @IsOptional()
    @IsUUID()
    module_id?: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;

    @IsOptional()
    @IsDateString()
    starting_date?: string;
}