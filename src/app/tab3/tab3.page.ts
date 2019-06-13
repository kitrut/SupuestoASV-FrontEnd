import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../models/pedido';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  

  constructor(private pedidoService:PedidosService) {}
  MisPedidos:Pedido[];
  public searchTerm: string = "";

  ngOnInit(): void {
    this.pedidoService.getPedidosFromServer('Juan').subscribe(
      data => {
        this.MisPedidos=data;
      }
    )
  }

  pay(item:Pedido){
    console.log("Pago del pedido "+item.idPedido)
  }
  cancel(item:Pedido){
    console.log("Cancelar pedido "+item.idPedido)
  }

  setFilteredItems(opt) {
    this.MisPedidos = this.pedidoService.filterItems(opt);
  }

}
