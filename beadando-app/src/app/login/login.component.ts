import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User | undefined;

  errorMessage!: string;

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private appComponent: AppComponent,
    private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  async login() {
    const user = await this.authService.authenticateUser(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value);
    console.log(user.role);
    if (user.role === 1) {
      this.appComponent.isLoggedIn = true;
      this.appComponent.isAdmin = true;
    }
    else if (user.role === 2) {
      this.appComponent.isLoggedIn = true;
      this.appComponent.isAdmin = false;
    }

    if (this.appComponent.isLoggedIn) {
      this.router.navigateByUrl('/patient-list');
    }
  }
}
