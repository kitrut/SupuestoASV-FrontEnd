import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
const URL:string = "http://localhost:9090/pedidos";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  

  constructor(private http: HttpClient) { }

  MisPedidos:Pedido[];

  getPedidosFromServer(user:String):Observable<Pedido[]>{
    let datos = this.http.get<Pedido[]>(URL+'?nombre='+user);
    datos.subscribe(data => {
      this.MisPedidos=data;
    })
    return datos;
  }

  createPedido(pedido:Pedido):Observable<Pedido>{
    return this.http.post<Pedido>(URL, pedido);
  }

  updatePedido(pedido:Pedido):Observable<Pedido>{
    return this.http.put<Pedido>(URL, pedido);
  }

  cancelarPedido(pedido:Pedido) {
    pedido.state="CANCELADO";
    pedido.estado="CANCELADO";
    return this.updatePedido(pedido);
  }
  pagarPedido(pedido:Pedido) {
    pedido.state="PAGADO";
    pedido.estado="PAGADO";
    return this.updatePedido(pedido);
  }

  filterItems(searchTerm) {
    return this.MisPedidos.filter(item => {
      return (""+item.state).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
