import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Plato } from '../../models/plato';

@Component({
  selector: 'lista-platos',
  templateUrl: './lista-platos.component.html',
  styleUrls: ['./lista-platos.component.scss'],
})
export class ListaPlatosComponent implements OnInit {

  @Input("platos") public platos: Plato[];
  @Output() public OutPlato = new EventEmitter<Plato>();
  constructor() { }

  ngOnInit() {}

  addPlato(plato:Plato){
    this.OutPlato.emit(plato)
  }

}
