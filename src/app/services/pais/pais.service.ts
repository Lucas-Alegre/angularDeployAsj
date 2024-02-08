import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  url: string = 'http://localhost:8080/pais';
 
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }
}
