/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lookupvalues } from "./lookupvalues.entity";

@Entity()
export class Lookups {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    createdAt: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    type: string

    @OneToMany(() => Lookupvalues, (lookupvalue) => lookupvalue.lookup)
    lookupvalue: Lookupvalues[]
}