import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpapiService {

  host = environment.apiHost

  constructor(private http: HttpClient) { }

  getEmployees() {
    const url = this.host + 'employees'
    return this.http.get(url);    
  }

  addEmployee(data: any) {
    const url = this.host + 'employees'
    return this.http.post(url, data, { headers: this.makeHeader() });    
  }

  updateEmployee(data: any) {
    const url = this.host + 'employees' + '/' + data.id
    return this.http.put(url, data, { headers: this.makeHeader() });
  }

  deleteEmployee(id: any) {
    const url = this.host + 'employees' + '/' + id
    return this.http.delete(url, { headers: this.makeHeader() });
  }

  makeHeader() {
    const token = localStorage.getItem('token')
    const header = { 'Authorization': 'Bearer ' + token }
    return header
  }
}
