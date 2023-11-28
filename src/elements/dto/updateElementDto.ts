/* eslint-disable prettier/prettier */
import { IsArray, IsNumber, IsString } from 'class-validator';

export class UpdateElementDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  payRunId: number;

  @IsNumber()
  payRunValueId: number;

  @IsNumber()
  classificationId: number;

  @IsNumber()
  classificationValueId: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  categoryValueId: number;

  @IsString()
  reportingName: string;

  @IsString()
  processingType: string;

  @IsString()
  status: string;

  @IsString()
  prorate: string;

  @IsString()
  effectiveStartDate: string;

  @IsString()
  effectiveEndDate: string;

  @IsArray()
  @IsString({ each: true })
  selectedMonths: string[];

  @IsString()
  payFrequency: string;
}
