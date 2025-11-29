import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAssignmentDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    weight: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsUUID()
    assignment_type_id: string;

    @IsNotEmpty()
    @IsUUID()
    module_id: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;
}

export class UpdateAssignmentDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    weight?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsUUID()
    assignment_type_id?: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;
}