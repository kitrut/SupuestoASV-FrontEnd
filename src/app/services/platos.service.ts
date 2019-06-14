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
  misPlatos:Plato[];
  getPlatosFromServer():Observable<Plato[]>{
    let platos = this.http.get<Plato[]>(URL+'/platos');
    platos.subscribe(data=>{
      this.misPlatos = data;
    })
    return platos;
  }

  createPlato(plato:Plato):Observable<Plato>{
    return this.http.post<Plato>(URL+'/platos', {nombre:plato.nombre,precio:plato.precio,tipo:plato.tipo});
  }

  filterItems(searchTerm){
    return this.misPlatos.filter(item => {
      return (""+item.tipo).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
