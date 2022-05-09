import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { MedicalHistory } from '../models/medicalhistory';
import { PatientService } from '../services/patient.service';
import { MedicalhistoryService } from '../services/medicalhistory.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  searchForm = this.formBuilder.group({
    patient: ['', Validators.required]
  });

  medicalHistories: MedicalHistory[] | undefined = undefined;
  isAdmin = this.appComponent.isAdmin;

  patients: Patient[] | undefined;
  selectedPatient: Patient | undefined;
  patientFound = false;

  constructor(
    private appComponent: AppComponent,
    private formBuilder: FormBuilder,
    private medicalHistoryService: MedicalhistoryService,
    private patientService: PatientService,
    private router: Router
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  async ngOnInit() {
    this.patients = await this.patientService.getAll();
  }

  async onChange() {
    this.medicalHistories = await this.medicalHistoryService.getMedicalHistoryByTAJ(this.searchForm.controls['patient'].value.taj);
    this.selectedPatient = await this.patientService.getPatientByTaj(this.searchForm.controls['patient'].value.taj)

    if (this.selectedPatient != undefined) {
      this.patientFound = true;
    }
  }

  navigateToVisitForm(id: any, isNew: boolean) {
    this.router.navigate(['/visit-form'], {
      queryParams: {
        id: id,
        isNew: isNew
      }
    });
  }

}
