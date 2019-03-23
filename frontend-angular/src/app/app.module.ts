import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './components/custom-material.module';
import { EmployeesComponent } from './views/employees/employees.component';
import { LoginComponent } from './views/login/login.component';
import { ReviewsComponent } from './views/reviews/reviews.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employees/:id', component: EmployeesComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'reviews/:id', component: ReviewsComponent },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeesComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      // useHash: true,
      // enableTracing: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
