/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreatelookupsDto {
  @IsString()
  createdAt: string;

  @IsString()
  name: string;

  @IsString()
  description: string;
  
  @IsString()
  type: string;
}
