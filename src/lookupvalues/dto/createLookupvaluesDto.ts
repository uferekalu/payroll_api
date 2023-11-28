/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class CreateLookupvaluesDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsString()
  lookupName: string;

  @IsString()
  createdAt: string;
}
