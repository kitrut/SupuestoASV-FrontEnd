import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plato } from '../../models/plato';
import { LineaPedido } from 'src/app/models/linea-pedido';

@Component({
  selector: 'tabla-platos',
  templateUrl: './tabla-platos.component.html',
  styleUrls: ['./tabla-platos.component.scss'],
})
export class TablaPlatosComponent implements OnInit {

  @Input() public pedidos: LineaPedido[];
  @Output() public addPlato = new EventEmitter<Plato>();
  @Output() public subPlato = new EventEmitter<Plato>();
  @Output() public removePlato = new EventEmitter<Plato>();
  constructor() { }

  ngOnInit() {}

  add(plato:Plato){
    this.addPlato.emit(plato)
  }

  sub(plato:Plato){
    this.subPlato.emit(plato)
  }

  remove(plato:Plato){
    this.removePlato.emit(plato)
  }

}
