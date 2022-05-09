import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { MedicalHistory } from "./MedicalHistory";

@Entity()
export class Patient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nev: string;

    @Column({ type: 'date' })
    szuldatum: Date;

    @Column()
    taj: string;

    @Column()
    nem: string;

    @OneToMany(type => MedicalHistory, medicalHistory => medicalHistory.patient)
    medicalHistory: MedicalHistory[];

}