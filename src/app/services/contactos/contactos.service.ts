import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  url: string = 'http://localhost:8080/contactos';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(contactos: any): Observable<any> {
    return this.http.post(this.url, contactos);
  }

  put(contactos: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, contactos);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
