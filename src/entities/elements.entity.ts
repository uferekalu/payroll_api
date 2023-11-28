/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Element {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  payRunId: number;

  @Column()
  payRunValueId: number;

  @Column()
  classificationId: number;

  @Column()
  classificationValueId: number;

  @Column()
  categoryId: number;

  @Column()
  categoryValueId: number;

  @Column()
  reportingName: string;

  @Column()
  processingType: string;

  @Column()
  status: string;

  @Column()
  prorate: string;

  @Column()
  effectiveStartDate: string;

  @Column()
  effectiveEndDate: string;

  @Column('text', { array: true })
  selectedMonths: string[];

  @Column()
  payFrequency: string;
}
