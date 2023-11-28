/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class CreateGradeStepDto {
    @IsString()
    createdAt: string

    @IsString()
    name: string

    @IsNumber()
    amount: number

    @IsString()
    description: string
}