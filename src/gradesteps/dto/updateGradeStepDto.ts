/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from "class-validator";

export class UpdateGradeStepDto {
    @IsString()
    createdAt: string

    @IsString()
    name: string

    @IsNumber()
    amount: number

    @IsString()
    description: string
}