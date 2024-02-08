import { Injectable, OnInit } from '@angular/core';
import { productos } from '../../data/productos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  url: string = 'http://localhost:8080/productos';
  productos: any = []

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(producto: any): Observable<any> {
    console.log(producto)
    return this.http.post(this.url, producto);
  }

  put(producto: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, producto);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
