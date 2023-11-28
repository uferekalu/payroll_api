/* eslint-disable prettier/prettier */
export class IElementLink {
  id: number;
  name: string;
  elementId: number;
  suborganizationId: number;
  locationId: number;
  departmentId: number;
  employeeCategoryId: number;
  employeeCategoryValueId: number;
  employeeTypeId: number;
  employeeTypeValueId: number;
  jobTitleId: number;
  grade: number;
  gradeStep: number;
  unionId: number;
  amountType: string;
  amount: number;
  rate: number;
  effectiveStartDate: string;
  effectiveEndDate: string;
  status: string;
  automate: string;
  additionalInfo: { lookupId: number; lookupValueId: number }[];
}
