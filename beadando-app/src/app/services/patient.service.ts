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

  async getTudoszuro() {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patient_tudoszuro'));
  }

  async getProsztata() {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patient_prosztata'));
  }

  async getMammografia() {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patient_mammografia'));
  }

  async getAltalanos() {
    return await lastValueFrom(this.http.get<Patient[]>('/api/patient_altalanos'));
  }
}
