import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthapiService {

  constructor(private http: HttpClient) { }

  register(data: any) {
    const url = 'http://localhost:8000/api/register'
    return this.http.post(url, data);
  }

  login(data: any) {
    const url = 'http://localhost:8000/api/login'
    return this.http.post(url, data);    
  }

}
