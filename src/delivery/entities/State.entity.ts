import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { DeliveryCompany } from './DeliveryCompany.entity';
import { Municipality } from './Municipality.entity';

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => DeliveryCompany, (company) => company.states, { onDelete: 'CASCADE' })
    company: DeliveryCompany;

    @OneToMany(() => Municipality, (municipality) => municipality.state, { cascade: true })
    municipalities: Municipality[];
}
