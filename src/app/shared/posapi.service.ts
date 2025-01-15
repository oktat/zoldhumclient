import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosapiService {

  host = environment.apiHost

  constructor(private http: HttpClient) { }

  getPositions() {
    const url = this.host + 'positions'
    return this.http.get(url);
  }
  addPosition(data: any) {
    const url = this.host + 'positions'
    return this.http.post(url, data);
  }
  updatePosition(data: any) {
    const url = this.host + 'positions' + '/' + data.id
    return this.http.put(url, data);
  }
  deletePosition(id: any) {
    const url = this.host + 'positions' + '/' + id
    return this.http.delete(url);
  }
}
