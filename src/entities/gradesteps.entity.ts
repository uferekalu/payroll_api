/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Grade } from './grade.entity';

@Entity()
export class GradeStep {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: string;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @ManyToOne(() => Grade, (grade) => grade.gradestep)
  grade: Grade;
}
