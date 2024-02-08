import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  url: string = 'http://localhost:8080/categoria';
 
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(categoria: any): Observable<any> {
    return this.http.post(this.url, categoria);
  }

  put(categoria: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, categoria);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
