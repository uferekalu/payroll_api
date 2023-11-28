/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  createdAt: string;

  @IsString()
  name: string;

  @IsString()
  note: string;
}
