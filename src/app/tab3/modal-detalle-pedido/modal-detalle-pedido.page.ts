import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-detalle-pedido',
  templateUrl: './modal-detalle-pedido.page.html',
  styleUrls: ['./modal-detalle-pedido.page.scss'],
})
export class ModalDetallePedidoPage implements OnInit {

  @Input() inputPedido:Pedido;
  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalController.dismiss();
  }

}
