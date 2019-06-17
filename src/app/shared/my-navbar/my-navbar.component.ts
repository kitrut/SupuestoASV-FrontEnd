import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.scss'],
})
export class MyNavbarComponent implements OnInit {

  @Input() opciones:String[];
  @Output() public select = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {}

  navChange(value){
    this.select.emit(value.detail.value);
  }

}
