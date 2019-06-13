import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
const URL:string = "http://localhost:9090";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  MisPedidos:Pedido[];

  getPedidosFromServer(user:String):Observable<Pedido[]>{
    let datos = this.http.get<Pedido[]>(URL+'/pedidos?nombre='+user);
    datos.subscribe(data => {
      this.MisPedidos=data;
    })
    return datos;
  }

  filterItems(searchTerm) {
    return this.MisPedidos.filter(item => {
      return (""+item.state).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
