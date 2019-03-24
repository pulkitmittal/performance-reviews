import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './components/custom-material.module';
import { EmployeePipe } from './pipes/employee.pipe';
import { FeedbackPipe } from './pipes/feedback.pipe';
import { EmployeesComponent } from './views/employees/employees.component';
import { FeedbacksComponent } from './views/feedbacks/feedbacks.component';
import { LoginComponent } from './views/login/login.component';
import { ReviewsComponent } from './views/reviews/reviews.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'feedback', component: FeedbacksComponent },
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
    ReviewsComponent,
    EmployeePipe,
    FeedbackPipe,
    FeedbacksComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, {
      // useHash: true,
      // enableTracing: true,
    }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
