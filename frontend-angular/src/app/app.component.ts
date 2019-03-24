import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: {
    name: string;
    admin: boolean;
  };

  menuOpen = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getLoggedInUser$()
      .subscribe(user => {
        this.user = user ? {
          name: user.username + (user.role === 'admin' ? ' (admin)' : ''),
          admin: user.role === 'admin'
        } : null;
      });
  }

  logout() {
    this.api.logout().then(() => {
      this.auth.logout();
      this.router.navigate(['login'], {
        queryParams: { logout: 1 }
      });
    });
  }
}
