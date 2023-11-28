/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from './department.entity';

@Entity()
export class Suborganizations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: string;

  @Column()
  name: string;

  @Column()
  note: string;

  @OneToMany(() => Department, (department) => department.suborganization)
  department: Department[];
}
