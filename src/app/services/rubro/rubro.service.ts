import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RubroService {


  url: string = 'http://localhost:8080/rubro';

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(rubro: any): Observable<any> {
    return this.http.post(this.url, rubro);
  }

  put(rubro: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, rubro);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
