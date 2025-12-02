import { IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionLevelDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class UpdateQuestionLevelDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}