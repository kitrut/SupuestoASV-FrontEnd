import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plato } from '../../models/plato';
import { PlatosService } from 'src/app/services/platos.service';

@Component({
  selector: 'app-modal-crear-plato',
  templateUrl: './modal-crear-plato.page.html',
  styleUrls: ['./modal-crear-plato.page.scss'],
})
export class ModalCrearPlatoPage implements OnInit {
  @Input() inputPlato:Plato;

  constructor(private modalController:ModalController,private platosService:PlatosService) { }

  precio:number;
  nombre:String;
  tipo:String;

  result:String;
  platoResult:Plato


  ngOnInit() {
    if(this.inputPlato != undefined){
      this.precio = this.inputPlato.precio;
      this.tipo = this.inputPlato.tipo;
      this.nombre = this.inputPlato.nombre;
    }
  }

  crearPlato(){
    let p:Plato = {idPlato:null,nombre:this.nombre,precio:this.precio,tipo:this.tipo};
    this.platosService.createPlato(p).subscribe(plato =>{this.result = "Plato guardado con id:"+plato.idPlato+""; this.platoResult=plato;} );
  }

  actualizarPlato(){
    let p:Plato = {idPlato:this.inputPlato.idPlato,nombre:this.nombre,precio:this.precio,tipo:this.tipo};
    this.platosService.updatePlato(p).subscribe(plato =>{this.result = "Plato actualizado"} );
  }
  closeModal(){
    this.modalController.dismiss();
  }

}
