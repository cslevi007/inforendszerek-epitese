import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  async getAll() {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patient'));
  }

  async addPatient(patient: Patient) {
    return await lastValueFrom(this.http.post<Patient>('/api/patient', patient));
  }

  async getPatientByID(id: any) {
    return await lastValueFrom(this.http.get<Patient>('/api/patient/' + id));
  }

  async filterPatient(search: string) {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patient', {
      params: { search }
    }));
  }

  async getPatientByTaj(search: string) {
    return await lastValueFrom(this.http.get<Patient>('/api/patientbytaj', {
      params: { search }
    }));
  }

  async getPatientKombo(sex: string, age: number, isAbove: boolean) {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patientkombo', {
      params: { sex, age, isAbove }
    }));
  }

  async deletePatient(id: number) {
    return await lastValueFrom(this.http.delete<Patient>('/api/patient/' + id))
  }
}
