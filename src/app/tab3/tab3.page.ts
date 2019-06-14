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
  

  constructor(private pedidoService:PedidosService,private  authService:  AuthService,private modalController:ModalController) {}
  MisPedidos:Pedido[];
  navSelected:string='';
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
    this.pedidoService.pagarPedido(item).subscribe(
      data => {
        item.state = TipoPedido.PAGADO;
      },
      err =>{

      }
    )    
  }
  cancel(item:Pedido){    
    this.pedidoService.cancelarPedido(item).subscribe(
      data => {
        item.state=TipoPedido.CANCELADO;
      },
      err =>{
        
      }
    )    
  }

  setFilteredItems(opt) {
    this.navSelected=opt;
    this.MisPedidos = this.pedidoService.filterItems(opt);
  }

}
