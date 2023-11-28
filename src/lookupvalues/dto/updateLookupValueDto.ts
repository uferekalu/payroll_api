/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';

export class UpdateLookupValuesDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  lookupName: string;

  @IsString()
  createdAt: string;
}
