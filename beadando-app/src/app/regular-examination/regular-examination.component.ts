import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Examination } from '../models/examination';
import { ExaminationService } from '../services/examination.service';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-regular-examination',
  templateUrl: './regular-examination.component.html',
  styleUrls: ['./regular-examination.component.css']
})
export class RegularExaminationComponent implements OnInit {

  examinations: Examination[] | undefined;
  allinone: any[] = [];
  isAdmin = this.appComponent.isAdmin;

  constructor(
    private appComponent: AppComponent,
    private patientService: PatientService,
    private examinationService: ExaminationService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.examinations = await this.examinationService.getAll();

    for (let i = 0; i < this.examinations.length; i++) {
      const item = {
        sex: this.examinations[i].sex,
        age: this.examinations[i].age,
        isAbove: this.examinations[i].isAbove
      }

      this.allinone[i] = { exam: this.examinations[i], patients: await this.patientService.getPatientKombo(item.sex, item.age, item.isAbove) }
    }
  }
}
