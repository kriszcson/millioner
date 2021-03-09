import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  error;
  constructor(private readonly http: HttpClient) {
  }

  login(email: string, password: string) {
    return this.http.post<any>((`${environment.API_URL}/auth/login`), { email: email, password: password });
  }

  signup(email: string, password: string) {
    return this.http.post<any>((`${environment.API_URL}/auth/signup`), { email: email, password: password, allAmount: 0 });
  }
}

