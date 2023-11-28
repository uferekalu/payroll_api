/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";

export class CreateGradeDto {
    @IsString()
    createdAt: string
    
    @IsString()
    name: string
    
    @IsString()
    description: string
}