import { Component, OnInit } from '@angular/core';
import { Plato } from '../models/plato';
import { PlatosService } from '../services/platos.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  usuario:String;
  showType:String = "Primeros";
  platos1:Plato[];
  platos2:Plato[];
  postres:Plato[];
  pedidos:Plato[] =[];
  precioTotal:number=0;
  constructor(private platosService:PlatosService,public alertController: AlertController,private  authService:  AuthService) {}
  
  ngOnInit(){
    this.platosService.getPlatosFromServer().subscribe(
      data => {
        data.map((x)=>{x.cantidad=0;return x;})
        this.platos1 = data.filter(plato => plato.tipo=="PRIMERO");
        this.platos2 = data.filter(plato => plato.tipo=="SEGUNDO");
        this.postres = data.filter(plato => plato.tipo=="POSTRE");
      }
    )
    this.authService.getUsuario().then(data=>{
      this.usuario = data;
    })
  }

  async confirmarPedido(){
    const alert = await this.alertController.create({
      header: 'Confirmar pedido',
      subHeader: 'Camarero/a: '+this.usuario,
      message: '',
      buttons: [{
        text: 'Confirmar',
        handler: (blah) => {
          console.log(this.pedidos);
        }
      }, 'Cerrar']
    });

    await alert.present();
    
  }

  resetPedido(){
    this.pedidos.map(plato => plato.cantidad=0);
    this.pedidos=[];
    this.precioTotal = 0;
  }

  compareFn(e1: Plato, e2: Plato): boolean {
    return e1 && e2 ? e1.idPlato === e2.idPlato : e1 === e2;
  }

  navChange(seleccion){
    this.showType = seleccion;
  }
  add(ev:Plato){
    this.precioTotal+=ev.precio;
    if(this.pedidos.includes(ev)){
      this.pedidos.find((someone)=>{return someone.nombre==ev.nombre}).cantidad+=1;
    }else{
      ev.cantidad+=1;
      this.pedidos.unshift(ev);
    }    
  }
  sub(ev:Plato){    
    let plato = this.pedidos.find((someone)=>{return someone.nombre==ev.nombre})
    if(plato.cantidad <=1){
      this.remove(ev)
    }
    else{
      this.precioTotal-=ev.precio;
      plato.cantidad-=1;
    }
  }
  remove(ev:Plato){
    this.precioTotal-=(ev.precio*ev.cantidad);
    ev.cantidad = 0;
    let index = this.pedidos.findIndex((someone)=>{return someone.idPlato==ev.idPlato})
    this.pedidos.splice(index,1);  
  }
}
