import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

  ngOnInit() {
    console.log('ngoninit', this.user, this.menuOpen);
    this.user = {
      name: 'Pulkit',
      admin: true
    };
  }

  logout() {
    // TODO make logout ajax call
    this.router.navigateByUrl('/login?logout=1');
  }
}
