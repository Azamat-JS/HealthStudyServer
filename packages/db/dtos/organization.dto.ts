import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateOrganizationDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;
}

export class UpdateteOrganizationDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    username?: string;
}