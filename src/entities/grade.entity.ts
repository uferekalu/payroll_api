/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GradeStep } from "./gradesteps.entity";

@Entity()
export class Grade {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    createdAt: string

    @Column()
    name: string

    @Column()
    description: string

    @OneToMany(() => GradeStep, (gradesteps) => gradesteps.grade)
    gradestep: GradeStep[]
}