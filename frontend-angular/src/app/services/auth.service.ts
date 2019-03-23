import { Injectable } from '@angular/core';
import { LoginResponse, SafeUser } from 'index';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // TODO remove this
  dummyAdminUser: LoginResponse = {
    login: true,
    user: { id: 1, username: 'smith', role: 'admin' },
    token: '12345'
  };
  dummyEmpUser: LoginResponse = {
    login: true,
    user: { id: 2, username: 'karen', role: 'employee' },
    token: '54321'
  };

  loggedInUser$ = new BehaviorSubject<SafeUser>(this.dummyAdminUser.user);
  authToken$ = new BehaviorSubject<string>(this.dummyAdminUser.token);

  constructor() { }

  logout() {
    this.loggedInUser$.next(null);
    this.authToken$.next(null);
  }

  setLoggedInUser(user: SafeUser) {
    this.loggedInUser$.next(user);
  }

  setAuthToken(token: string) {
    this.authToken$.next(token);
  }

  getAuthToken() {
    return this.authToken$.getValue();
  }

  getLoggedInUser$(): Observable<SafeUser> {
    return this.loggedInUser$.asObservable();
  }

  getLoggedInUser() {
    return this.loggedInUser$.getValue();
  }

  isAdmin(): boolean {
    const user = this.getLoggedInUser();
    return user && user.role === 'admin';
  }
}
