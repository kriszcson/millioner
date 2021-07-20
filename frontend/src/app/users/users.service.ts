import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>((`${environment.API_URL}/auth/login`), { email: email, password: password });
  }

  signup(email: string, password: string) {
    return this.http.post<any>((`${environment.API_URL}/auth/signup`), { email: email, password: password, allAmount: 0 });
  }

  updatePoints(email: string, points: number) {
    return this.http.put<any>((`${environment.API_URL}/users/updatepoints`), { email: email, allAmount: points });
  }

  tokenExpired(token: string): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}

