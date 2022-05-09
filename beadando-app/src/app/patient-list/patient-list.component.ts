import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Patient } from '../models/patient';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] | undefined = undefined;
  searchQuery = ''
  isAdmin = this.appComponent.isAdmin;

  constructor(
    private appComponent: AppComponent,
    private patientService: PatientService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.patients = await this.patientService.getAll();
  }

  async search() {
    this.patients = await this.patientService.filterPatient(this.searchQuery);
  }

  navigateToPatienteForm(id: any) {
    this.router.navigate(['/patient-form'], {
      queryParams: {
        id: id
      }
    });
  }

  async deletePatient(id: any) {
    await this.patientService.deletePatient(id)
    this.ngOnInit();
  }

}
