import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plato } from '../../models/plato';
import { PlatosService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-modal-crear-plato',
  templateUrl: './modal-crear-plato.page.html',
  styleUrls: ['./modal-crear-plato.page.scss'],
})
export class ModalCrearPlatoPage implements OnInit {

  constructor(private modalController:ModalController,private platosService:PlatosService) { }

  precio:number;
  nombre:String;
  tipo:String;

  result:String;


  ngOnInit() {
  }

  crearPlato(){
    let p:Plato = {idPlato:null,nombre:this.nombre,precio:this.precio,tipo:this.tipo,cantidad:null};
    this.platosService.createPlato(p).subscribe(plato =>{this.result = "Plato guardado con id:"+plato.idPlato+"";} );
  }
  closeModal(){
    this.modalController.dismiss();
  }

}
