import { Patient } from "./patient";

export interface MedicalHistory {
    id: string;
    diagnosis: string,
    medicines: string,
    treatments: string,
    medrecords: string,
    patient: Patient
}