import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateGroupAttendanceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsUUID()
    group_id: string;

    @IsNotEmpty()
    @IsUUID()
    student_id: string;

    @IsOptional()
    @IsString()
    lesson_id?: string;

    @IsNotEmpty()
    @IsUUID()
    module_id: string;

    @IsNotEmpty()
    @IsBoolean()
    isAttended: boolean;

    @IsOptional()
    @IsString()
    comment?:string;
}

export class UpdateGroupAttendanceDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsUUID()
    group_id?: string;

    @IsOptional()
    @IsUUID()
    student_id?: string;

    @IsOptional()
    @IsString()
    lesson_id?: string;

    @IsOptional()
    @IsUUID()
    module_id?: string;

    @IsOptional()
    @IsBoolean()
    isAttended?: boolean;

    @IsOptional()
    @IsString()
    comment?:string;
}