import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Examination {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    interval: number;

    @Column()
    sex: string;

    @Column()
    age: number;

    @Column()
    isAbove: boolean;

}