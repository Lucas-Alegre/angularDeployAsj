import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { proveedor } from 'src/app/data/proveedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  url: string = 'http://localhost:8080/proveedores';
  proveedor: any = proveedor;
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url)
  }

  getById(id: any): Observable<any> {
    return this.http.get(this.url + "/" + id)
  }

  post(proveedor: any): Observable<any> {
    return this.http.post(this.url, proveedor);
  }

  put(proveedor: any, id: any): Observable<any> {
    return this.http.put(this.url + "/" + id, proveedor);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url + "/" + id);
  }
}
