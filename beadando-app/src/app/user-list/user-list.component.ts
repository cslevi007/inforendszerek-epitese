import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isAdmin = this.appComponent.isAdmin;

  constructor(
    private appComponent: AppComponent,
    private userService: UserService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.users = await this.userService.getAll();
  }

  async deleteUser(id: any) {
    await this.userService.deleteUser(id)
    this.ngOnInit();

  }

  navigateToUserForm(id: any) {
    this.router.navigate(['/user-form'], {
      queryParams: {
        id: id
      }
    });
  }
}
