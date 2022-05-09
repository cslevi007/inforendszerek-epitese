import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { VisitListComponent } from './visit-list/visit-list.component';
import { VisitFormComponent } from './visit-form/visit-form.component';
import { RegularExaminationComponent } from './regular-examination/regular-examination.component';
import { RegularExaminationFormComponent } from './regular-examination-form/regular-examination-form.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'user-form',
    component: UserFormComponent
  },
  {
    path: 'patient-list',
    component: PatientListComponent
  },
  {
    path: 'patient-form',
    component: PatientFormComponent
  },
  {
    path: 'visit-list',
    component: VisitListComponent
  },
  {
    path: 'visit-form',
    component: VisitFormComponent
  },
  {
    path: 'regular-examination',
    component: RegularExaminationComponent
  },
  {
    path: 'regular-examination-form',
    component: RegularExaminationFormComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
