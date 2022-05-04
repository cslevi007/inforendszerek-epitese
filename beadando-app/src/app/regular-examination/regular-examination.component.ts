import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-regular-examination',
  templateUrl: './regular-examination.component.html',
  styleUrls: ['./regular-examination.component.css']
})
export class RegularExaminationComponent implements OnInit {

  patients: Patient[] | undefined = undefined;
  tudoszuro: Patient[] = []
  prosztata: Patient[] = []
  mammografia: Patient[] = []
  altalanos: Patient[] = []

  constructor(private patientService: PatientService) { }

  async ngOnInit() {
    this.patients = await this.patientService.getAll();
    this.tudoszuro = await this.patientService.getTudoszuro();
    this.prosztata = await this.patientService.getProsztata();
    this.mammografia = await this.patientService.getMammografia();
    this.altalanos = await this.patientService.getAll();
  }
}
