import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Patient } from "./Patient";

@Entity()
export class MedicalHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    diagnosis: string;

    @Column()
    medicines: string;

    @Column()
    treatments: string;

    @Column()
    medrecords: string;

    @ManyToOne(type => Patient, patient => patient.medicalHistory)
    patient: Patient;

}