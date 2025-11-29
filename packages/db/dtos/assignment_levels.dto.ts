import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateAssignmentLevelDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsUUID()
    level_id: string;
    
    @IsNotEmpty()
    @IsUUID()
    unit_id: string;
    
    @IsNotEmpty()
    @IsUUID()
    assignment_id: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    quantity: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}

export class UpdateAssignmentLevelDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsUUID()
    level_id?: string;
    
    @IsOptional()
    @IsUUID()
    unit_id?: string;
    
    @IsOptional()
    @IsUUID()
    assignment_id?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    quantity?: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;
}