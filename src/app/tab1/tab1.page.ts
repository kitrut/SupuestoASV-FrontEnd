import { Component, OnInit } from '@angular/core';
import { Plato } from '../models/plato';
import { PlatosService } from '../services/platos.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { LineaPedido } from '../models/linea-pedido';
import { FormBuilder } from '@angular/forms';
import { Pedido } from '../models/pedido';
import { PedidosService } from '../services/pedidos.service';
import { TipoPedido } from '../models/tipo-pedido.enum';

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
  lineasPedido:LineaPedido[] =[];
  postInfo:String;

  precioTotal:number=0;
  constructor(
    private platosService:PlatosService,
    private pedidosService:PedidosService,
    public alertController: AlertController,
    private  authService:  AuthService
  ) {}
  
  ngOnInit(){
    this.platosService.getPlatosFromServer().subscribe(
      data => {
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
          let ped:Pedido = {state:TipoPedido.EMITIDO,estado:TipoPedido.EMITIDO,idPedido:null,fechaServicio:null,nombreUsuario:"Manu",lineas:this.lineasPedido,total:this.precioTotal};
          this.pedidosService.createPedido(ped).subscribe(
            data=>{
              alert.message = "Pedido creado ID:" + data.idPedido
              this.confirmadoEnServer(data)
            },
            err=>{
              alert.message = "Error al crear el pedido:"+err;
              return false;
            })          
        }
      }, 'Cerrar']
    }); 
    await alert.present();    
  }
  async confirmadoEnServer(data:Pedido){
    const alert = await this.alertController.create({
      header: 'Pedido confirmado',
      subHeader: "ID:"+data.idPedido,
      message: '',
      buttons: [{
        text: 'Cerrar',
        handler: (blah) => {
          this.resetPedido()
        }
      }]
    }); 
    await alert.present();    
  }


  
  resetPedido(){
    this.lineasPedido=[];
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
    let found = this.lineasPedido.find((someone)=>{return someone.nombre==ev.nombre;})

    if(found != undefined){
      found.cantidad +=1;
    }else{
      this.lineasPedido.unshift({idLineaPedido:null,cantidad:1,nombre:ev.nombre,precio:ev.precio});
    }    
  }
  sub(ev:Plato){    
    let found = this.lineasPedido.find((someone)=>{return someone.nombre==ev.nombre})
    if(found.cantidad <=1){
      this.remove(found)
    }
    else{
      this.precioTotal-=ev.precio;
      found.cantidad-=1;
    }
  }
  remove(ev:LineaPedido){
    this.precioTotal-=(ev.precio*ev.cantidad);
    let index = this.lineasPedido.findIndex((someone)=>{return someone.nombre==ev.nombre})
    this.lineasPedido.splice(index,1);  
  }
}
