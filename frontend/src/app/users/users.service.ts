import { User } from './user.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";

import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>((`${environment.API_URL}/login`), { email: email, password: password })
      .pipe(tap(resData => {
        this.handleAuthentication(resData);
      }))
  }

  handleAuthentication(resData: any) {
    localStorage.setItem('access_token', resData.token);
    const tokenData: any = jwt_decode(resData.token);
    const user = new User(tokenData.sub, tokenData.email, tokenData.allAmount)
    this.user.next(user);
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  signup(email: string, password: string) {
    return this.http.post<any>((`${environment.API_URL}/signup`), { email: email, password: password, allAmount: 0 });
  }

  updatePoints(email: string, points: number) {
    return this.http.put<any>((`${environment.API_URL}/users/updatepoints`), { email: email, allAmount: points });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  tokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}

