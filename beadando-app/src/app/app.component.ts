import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isLoggedIn = false;
  public isAdmin = false;

  title = 'beadando-app';

  constructor(private router: Router) { };

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/patient-list');
    } else {
      this.router.navigate(['/']);
    }
  }
}
