import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/patient';
import { MedicalHistory } from '../models/medicalhistory';
import { PatientService } from '../services/patient.service';
import { MedicalhistoryService } from '../services/medicalhistory.service';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {

  visitForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private medicalHistoryService: MedicalhistoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.visitForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];

    this.visitForm = this.formBuilder.group({
      id: [],
      diagnosis: ['', Validators.required],
      medicines: ['', Validators.required],
      treatments: ['', Validators.required],
      medrecords: ['', Validators.required],
      patient: ['', Validators.required]
    });

    if (id) {
      const visit = await this.medicalHistoryService.getMedicalHistoryById(id);
      this.visitForm.controls['id'].setValue(visit?.id);
      this.visitForm.controls['diagnosis'].setValue(visit?.diagnosis);
      this.visitForm.controls['medicines'].setValue(visit?.medicines);
      this.visitForm.controls['treatments'].setValue(visit?.treatments);
      this.visitForm.controls['medrecords'].setValue(visit?.medrecords);
      this.visitForm.controls['patient'].setValue(visit?.patient);
    }

  }

  async addMedicalHistory() {
    // this.visitForm.controls['medicines'].setValue("ololol");
    // this.visitForm.controls['pattreatmentsient'].setValue("huhaaa");
    // this.visitForm.controls['medrecords'].setValue("trollolo");
    this.visitForm.controls['patient'].setValue(2);
    const medicalHistory = this.visitForm.value;
    this.medicalHistoryService.addMedicalHistory(medicalHistory);
    this.router.navigateByUrl('/visit-list');
  }

}
