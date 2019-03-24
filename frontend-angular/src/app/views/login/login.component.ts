import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  errorMsg = '';
  loggedOutMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.logout === '1') {
        this.loggedOutMsg = 'You have been successfully logged out.';
      }
    });
  }

  update(key: 'username' | 'password', value: string) {
    if (key === 'username') {
      this.username = value;
    } else if (key === 'password') {
      this.password = value;
    }
  }

  onEnter() {
    if (this.username && this.password) {
      this.login();
    }
  }

  login() {
    console.log('Login:', this.username, this.password);
    this.api.login(this.username, this.password)
      .then(res => {
        if (res.login) {
          this.auth.setLoggedInUser(res.user);
          this.auth.setAuthToken(res.token);
          if (res.user.role === 'admin') {
            this.router.navigate(['employees']);
          } else {
            this.router.navigate(['feedback']);
          }
        }
      })
      .catch(err => {
        console.log('Error:', err);
        this.errorMsg = err && err.error && err.error.message || '';
      });
  }

}
