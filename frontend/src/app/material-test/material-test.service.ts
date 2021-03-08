import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaterialTestService {

  constructor(private http: HttpClient) { }

  getHelloTest() {
    return this.http.get<any>('http://localhost:3000');
  }

}
