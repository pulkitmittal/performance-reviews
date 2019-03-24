import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddReviewRequest, Employee, Feedback, FeedbackResponse, LoginRequest, LoginResponse, ReviewResponse } from 'index';
import { first } from 'rxjs/operators';

import { AuthService } from './auth.service';

export interface FeedbackQuestions {
  '1': string;
  '2': string;
  '3': string;
  '4': string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // TODO move this to config file
  serverUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
    // TODO use an interceptor to add headers
  }

  login(username: string, password: string): Promise<LoginResponse> {
    const requestBody: LoginRequest = {
      username, password
    };
    return this.http.post<LoginResponse>(`${this.serverUrl}/login`, requestBody, {
      headers: {
        'X-Requested-With': 'xmlhttprequest'
      }
    }).pipe(first()).toPromise();
  }

  logout() {
    return this.http.post(`${this.serverUrl}/logout`, {}, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      }
    }).pipe(first()).toPromise();
  }

  fetchEmployees() {
    return this.http.get<Employee[]>(`${this.serverUrl}/employees`, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      }
    }).pipe(first()).toPromise();
  }

  addEmployee(emp: Employee) {
    return this.http.post(`${this.serverUrl}/employees`, emp, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

  editEmployee(emp: Employee) {
    return this.http.put(`${this.serverUrl}/employees/${emp.id}`, emp, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

  deleteEmployee(emp: Employee) {
    return this.http.delete(`${this.serverUrl}/employees/${emp.id}`, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

  fetchReviews() {
    return this.http.get<ReviewResponse[]>(`${this.serverUrl}/reviews`, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      }
    }).pipe(first()).toPromise();
  }

  addReview(reqData: AddReviewRequest) {
    return this.http.post(`${this.serverUrl}/reviews`, reqData, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

  updateReview(id: number, reqData: AddReviewRequest) {
    return this.http.put(`${this.serverUrl}/reviews/${id}`, reqData, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

  deleteReview(id: number) {
    return this.http.delete(`${this.serverUrl}/reviews/${id}`, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

  fetchFeedbackRequests() {
    return this.http.get<FeedbackResponse[]>(`${this.serverUrl}/feedback`, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      }
    }).pipe(first()).toPromise();
  }

  saveFeedback(id: number, feedback: Pick<Feedback, 'status' | 'response'>) {
    return this.http.put(`${this.serverUrl}/feedback/${id}`, feedback, {
      headers: {
        'X-Requested-With': 'xmlhttprequest',
        'token': this.auth.getAuthToken()
      },
      responseType: 'text'
    }).pipe(first()).toPromise();
  }

}
