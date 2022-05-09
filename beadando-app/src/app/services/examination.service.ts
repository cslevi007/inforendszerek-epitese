import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examination } from '../models/examination';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private http: HttpClient) { }

  async getAll() {
    return await lastValueFrom(this.http.get<Examination[]>('/api/examinations'));
  }

  async addExamination(examination: Examination) {
    return await lastValueFrom(this.http.post<Examination>('/api/examination', examination));
  }
}
