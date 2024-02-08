import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ordenDeCompra } from 'src/app/data/ordenCompra';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  url: string = 'http://localhost:8080/ordenDeCompra';
  ordenCompra: any = ordenDeCompra;

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(orden: any): Observable<any> {
    return this.http.post(this.url, orden);
  }

  put(orden: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, orden);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }

}
