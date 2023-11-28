/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Elementlinks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  elementId: number;

  @Column({ nullable: true })
  suborganizationId: number;

  @Column({ nullable: true })
  locationId: number;

  @Column({ nullable: true })
  departmentId: number;

  @Column({ nullable: true })
  employeeCategoryId: number;

  @Column({ nullable: true })
  employeeCategoryValueId: number;

  @Column({ nullable: true })
  employeeTypeId: number;

  @Column({ nullable: true })
  employeeTypeValueId: number;

  @Column({ nullable: true })
  jobTitleId: number;

  @Column({ nullable: true })
  grade: number;

  @Column({ nullable: true })
  gradeStep: number;

  @Column({ nullable: true })
  unionId: number;

  @Column({ nullable: true })
  amountType: string;

  @Column()
  amount: number;

  @Column()
  rate: number;

  @Column({ nullable: true })
  effectiveStartDate: string;

  @Column({ nullable: true })
  effectiveEndDate: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  automate: string;

  @Column({ type: 'jsonb', array: false, nullable: true })
  additionalInfo: { lookupId: number; lookupValueId: number }[];
}
