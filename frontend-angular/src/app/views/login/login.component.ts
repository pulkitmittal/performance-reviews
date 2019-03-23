import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  login() {
    // TODO make ajax call here
    this.router.navigate(['employees']);
  }

}
