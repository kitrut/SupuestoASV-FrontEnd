import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Plato } from '../models/plato';
import { Observable } from 'rxjs';

const URL:string = "http://localhost:9090";

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  
  constructor(private http: HttpClient) { }

  getPlatosFromServer():Observable<Plato[]>{
    return this.http.get<Plato[]>(URL+'/platos');
  }

  createPlato(plato:Plato):Observable<Plato>{
    return this.http.post<Plato>(URL+'/platos', {nombre:plato.nombre,precio:plato.precio,tipo:plato.tipo});
  }
}
