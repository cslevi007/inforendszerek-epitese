import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicalHistory } from '../models/medicalhistory';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicalhistoryService {

  constructor(private http: HttpClient) { }

  async getAll() {
    return await lastValueFrom(this.http.get<MedicalHistory[]>('/api/medicalhistory'));
  }

  async addMedicalHistory(medicalhistory: MedicalHistory) {
    console.log(medicalhistory)
    return await lastValueFrom(this.http.post<MedicalHistory>('/api/medicalhistory', medicalhistory));
  }

  async getMedicalHistoryByTAJ(search: string) {
    return await lastValueFrom(this.http.get<MedicalHistory[]>('/api/medicalhistory_taj/', {
      params: { search }
    }));
  }

  async getMedicalHistoryById(id: any) {
    return await lastValueFrom(this.http.get<MedicalHistory>('/api/medicalhistory/' + id));
  }
}
