/* eslint-disable prettier/prettier */
import {
  IsNumber,
  IsString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AdditionalInfoDto {
  @IsNumber()
  lookupId: number;

  @IsNumber()
  lookupValueId: number;
}

export class CreateElementLinkDto {
  @IsString()
  name: string;

  @IsNumber()
  elementId: number

  @IsOptional()
  @IsNumber()
  suborganizationId?: number;

  @IsOptional()
  @IsNumber()
  locationId?: number;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsNumber()
  employeeCategoryId?: number;

  @IsOptional()
  @IsNumber()
  employeeCategoryValueId?: number;

  @IsOptional()
  @IsNumber()
  employeeTypeId?: number;

  @IsOptional()
  @IsNumber()
  employeeTypeValueId?: number;

  @IsOptional()
  @IsNumber()
  jobTitleId?: number;

  @IsOptional()
  @IsNumber()
  grade?: number;

  @IsOptional()
  @IsNumber()
  gradeStep?: number;

  @IsOptional()
  @IsNumber()
  unionId?: number;

  @IsOptional()
  @IsString()
  amountType?: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  rate: number;

  @IsOptional()
  @IsString()
  effectiveStartDate?: string;

  @IsOptional()
  @IsString()
  effectiveEndDate?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  automate?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdditionalInfoDto)
  additionalInfo?: AdditionalInfoDto[];
}
