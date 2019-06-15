import { Component, OnInit } from '@angular/core';
import { PedidosService } from '../services/pedidos.service';
import { Pedido } from '../models/pedido';
import { AuthService } from '../services/auth.service';
import { ModalDetallePedidoPage } from './modal-detalle-pedido/modal-detalle-pedido.page';
import { ModalController } from '@ionic/angular';
import { TipoPedido } from '../models/tipo-pedido.enum';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  opciones:String[] = ["Todo","Emitido","Entregado","Pagado","Cancelado"];
  MisPedidos:Pedido[];

  constructor(private pedidoService:PedidosService,private  authService:  AuthService,private modalController:ModalController) {}
  
  ngOnInit(): void {
    
  }

  ionViewWillEnter(){
    this.authService.isLoggedIn();
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
    this.pedidoService.pagarPedido(item).subscribe(
      data => {
        item.state = TipoPedido.PAGADO;
      },
      err =>{
        item.state=TipoPedido.ENTREGADO;
      }
    )    
  }
  cancel(item:Pedido){    
    this.pedidoService.cancelarPedido(item).subscribe(
      data => {
        if(data==null)item.state=TipoPedido.EMITIDO;
      },
      err =>{
        item.state=TipoPedido.EMITIDO;
      }
    )    
  }

  setFilteredItems(opt) {
    let seleccionada = opt.detail.value;
    if(seleccionada==this.opciones[0]){
      seleccionada='';
    }
    this.MisPedidos = this.pedidoService.filterItems(seleccionada);

  }

}
