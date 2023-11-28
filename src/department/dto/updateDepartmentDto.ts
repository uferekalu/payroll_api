/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  createdAt: string;

  @IsString()
  name: string;

  @IsString()
  note: string;
}
