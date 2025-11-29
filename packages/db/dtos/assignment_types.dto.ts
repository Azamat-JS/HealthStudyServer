import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateDateColumn } from 'typeorm';

export class CreateAssignmentTypeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsUUID()
    module_id: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsString()
    weight: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;

    @CreateDateColumn({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}

export class UpdateAssignmentTypeDto {
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsOptional()
    @IsUUID()
    module_id?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    weight?: string;

    @IsOptional()
    @IsNumber()
    sequence?: number;
}
