import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../models/patient';
import { MedicalHistory } from '../models/medicalhistory';
import { PatientService } from '../services/patient.service';
import { MedicalhistoryService } from '../services/medicalhistory.service';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  medicalHistories: MedicalHistory[] | undefined = undefined;
  searchQuery = ''
  isAdmin = false;
  name = "";

  constructor(
    private medicalHistoryService: MedicalhistoryService,
    private router: Router
  ) { }

  async ngOnInit() {
    // this.medicalHistories = await this.medicalHistoryService.getAll();
    this.isAdmin = sessionStorage.getItem('role') === "1"
  }

  async search() {
    this.medicalHistories = await this.medicalHistoryService.getMedicalHistoryByTAJ(this.searchQuery);
  }

  navigateToVisitForm(id: any) {
    this.router.navigate(['/visit-form'], {
      queryParams: {
        id: id
      }
    });
  }

}
