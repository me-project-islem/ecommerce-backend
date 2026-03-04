import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { State } from './State.entity';

@Entity()
export class DeliveryCompany {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => State, (state) => state.company, { cascade: true })
    states: State[];
}
