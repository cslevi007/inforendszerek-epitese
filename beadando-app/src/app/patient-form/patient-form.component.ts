import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {

  patientForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }


  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];

    this.patientForm = this.formBuilder.group({
      id: [],
      nev: ['', Validators.compose([Validators.minLength(3), Validators.required])],
      taj: ['', Validators.compose([Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{3}'), Validators.required])],
      szuldatum: ['', Validators.required],
      nem: ['', Validators.required]
    });

    if (id) {
      const patient = await this.patientService.getPatientByID(id);
      this.patientForm.controls['id'].setValue(patient?.id);
      this.patientForm.controls['nev'].setValue(patient?.nev);
      this.patientForm.controls['taj'].setValue(patient?.taj);
      this.patientForm.controls['szuldatum'].setValue(patient?.szuldatum);
      this.patientForm.controls['nem'].setValue(patient?.nem)
    }
  }

  async addPatient() {
    const patient = this.patientForm.value;
    this.patientService.addPatient(patient);
    this.router.navigateByUrl('/patient-list');
  }
}
