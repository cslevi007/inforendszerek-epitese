import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';
import { MedicalhistoryService } from '../services/medicalhistory.service';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {

  visitForm!: FormGroup;
  patientToInsert: Patient | undefined;

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
    const isNew = this.activatedRoute.snapshot.queryParams['isNew']

    this.visitForm = this.formBuilder.group({
      id: [],
      diagnosis: ['', Validators.required],
      medicines: [''],
      treatments: [''],
      medrecords: [''],
      patient: [this.patientToInsert, Validators.required]
    });

    if (isNew == "false") {
      const medicalHistoryId = this.activatedRoute.snapshot.queryParams['id'];

      if (medicalHistoryId) {
        const visit = await this.medicalHistoryService.getMedicalHistoryById(medicalHistoryId);
        console.log("most a módosítás fut")

        this.visitForm.controls['id'].setValue(visit?.id);
        this.visitForm.controls['diagnosis'].setValue(visit?.diagnosis);
        this.visitForm.controls['medicines'].setValue(visit?.medicines);
        this.visitForm.controls['treatments'].setValue(visit?.treatments);
        this.visitForm.controls['medrecords'].setValue(visit?.medrecords);
        this.visitForm.controls['patient'].setValue(visit?.patient);
      }
    }
    else {
      const patientId = this.activatedRoute.snapshot.queryParams['id'];
      const tmp = await this.patientService.getPatientByID(patientId);
      this.visitForm.controls['patient'].setValue(tmp);
      console.log("a hozzáadás fut most")
    }


  }

  async addMedicalHistory() {
    const medicalHistory = this.visitForm.value;

    this.medicalHistoryService.addMedicalHistory(medicalHistory);
    this.router.navigateByUrl('/visit-list');
  }

}
