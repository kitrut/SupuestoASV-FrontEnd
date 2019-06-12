import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  showType:String = "Primeros";
  empleados:String[] = ["Juan","Miguel","María"];
  platos1:Platos[] = [{id:1,nombre:"Entremeses",precio:2.5,isChecked:false,cantidad:0},{id:2,nombre:"Ensalada de marisco",precio:2.5,isChecked:false,cantidad:0},{id:3,nombre:"Boquerones",precio:2.5,isChecked:false,cantidad:0}];
  platos2:Platos[] = [{id:1,nombre:"Macarrones",precio:2.5,isChecked:false,cantidad:0},{id:2,nombre:"Pechuga de pollo",precio:2.5,isChecked:false,cantidad:0},{id:3,nombre:"Pescado",precio:2.5,isChecked:false,cantidad:0}];
  postres:Platos[] = [{id:1,nombre:"Fruta",precio:2.5,isChecked:false,cantidad:0},{id:2,nombre:"Helado",precio:2.5,isChecked:false,cantidad:0},{id:3,nombre:"Tarta",precio:2.5,isChecked:false,cantidad:0}];
  pedidos:Platos[] =[];
  precioTotal:number=0;
  constructor() {}
  
  ngOnInit(){

  }

  compareFn(e1: Platos, e2: Platos): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  segmentChanged(ev:any){
    this.showType = ev.detail.value;
  }
  add(ev:Platos){
    this.precioTotal+=ev.precio;
    if(this.pedidos.includes(ev)){
      this.pedidos.find((someone)=>{return someone.nombre==ev.nombre}).cantidad+=1;
    }else{
      ev.cantidad+=1;
      this.pedidos.unshift(ev);
    }    
  }
  down(ev:Platos){
    
    let plato = this.pedidos.find((someone)=>{return someone.nombre==ev.nombre})
    if(plato.cantidad <=1){
      this.remove(ev)
    }
    else{
      this.precioTotal-=ev.precio;
      plato.cantidad-=1;
    }
  }
  remove(ev:Platos){
    this.precioTotal-=(ev.precio*ev.cantidad);
    ev.cantidad = 0;
    let index = this.pedidos.findIndex((someone)=>{return someone.nombre==ev.nombre})
    this.pedidos.splice(index,1);  
  }

}

class Platos{
  id:number;
  nombre:String;
  precio:number;
  isChecked:Boolean;
  cantidad:number;
}
