import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  url: string = 'http://localhost:8080/direccion';
 
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(direccion: any): Observable<any> {
    return this.http.post(this.url, direccion);
  }

  put(direccion: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, direccion);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
