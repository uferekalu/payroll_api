/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Lookups } from './lookups.entity';


@Entity()
export class Lookupvalues {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => Lookups, (lookup) => lookup.lookupvalue)
  lookup: Lookups;

  @Column()
  lookupName: string;

  @Column()
  createdAt: string;
}
