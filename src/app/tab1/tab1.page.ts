import { Component, OnInit } from '@angular/core';
import { Plato } from './models/plato';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  showType:String = "Primeros";
  empleados:String[] = ["Juan","Miguel","María"];
  platos1:Plato[] = [{id:1,nombre:"Entremeses",precio:2.5,isChecked:false,cantidad:0},{id:2,nombre:"Ensalada de marisco",precio:2.5,isChecked:false,cantidad:0},{id:3,nombre:"Boquerones",precio:2.5,isChecked:false,cantidad:0}];
  platos2:Plato[] = [{id:1,nombre:"Macarrones",precio:2.5,isChecked:false,cantidad:0},{id:2,nombre:"Pechuga de pollo",precio:2.5,isChecked:false,cantidad:0},{id:3,nombre:"Pescado",precio:2.5,isChecked:false,cantidad:0}];
  postres:Plato[] = [{id:1,nombre:"Fruta",precio:2.5,isChecked:false,cantidad:0},{id:2,nombre:"Helado",precio:2.5,isChecked:false,cantidad:0},{id:3,nombre:"Tarta",precio:2.5,isChecked:false,cantidad:0}];
  pedidos:Plato[] =[];
  precioTotal:number=0;
  constructor() {}
  
  ngOnInit(){

  }

  compareFn(e1: Plato, e2: Plato): boolean {
    return e1 && e2 ? e1.id === e2.id : e1 === e2;
  }

  segmentChanged(ev:any){
    this.showType = ev.detail.value;
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
    let index = this.pedidos.findIndex((someone)=>{return someone.nombre==ev.nombre})
    this.pedidos.splice(index,1);  
  }
}
