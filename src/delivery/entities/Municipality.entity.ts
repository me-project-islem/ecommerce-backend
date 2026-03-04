import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { State } from './State.entity';

@Entity()
export class Municipality {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('decimal', {
        precision: 10, scale: 2, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    homePrice: number;

    @Column('decimal', {
        precision: 10, scale: 2, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value)
        }
    })
    officePrice: number;

    @ManyToOne(() => State, (state) => state.municipalities, { onDelete: 'CASCADE' })
    state: State;
}
