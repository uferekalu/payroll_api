/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Suborganizations } from './suborganizations.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: string;

  @Column()
  name: string;

  @Column()
  note: string;

  @ManyToOne(
    () => Suborganizations,
    (suborganization) => suborganization.department,
  )
  suborganization: Suborganizations;
}
