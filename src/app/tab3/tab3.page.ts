import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../models/pedido';
import { AuthService } from '../services/auth.service';
import { ModalDetallePedidoPage } from './modal-detalle-pedido/modal-detalle-pedido.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  

  constructor(private pedidoService:PedidosService,private  authService:  AuthService,private modalController:ModalController) {}
  MisPedidos:Pedido[];
  public searchTerm: string = "";

  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.authService.getUsuario().then(data=>{
      this.pedidoService.getPedidosFromServer(data).subscribe(
        data => {
          this.MisPedidos=data;
        }
      )    
    },
    err=>{
      console.error("Error al pedir los pedidos")
    })
    
  }

  async showDetails(pedido:Pedido){
    const modal = await this.modalController.create({
      component: ModalDetallePedidoPage,
      cssClass:'mymodal',
      componentProps:{
        inputPedido : pedido        
      }
    });
    await modal.present();
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
