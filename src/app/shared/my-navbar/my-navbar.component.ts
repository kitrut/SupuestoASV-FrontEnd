import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.scss'],
})
export class MyNavbarComponent implements OnInit {

  @Input() opciones:String[];
  @Output() public select = new EventEmitter<String>();

  enableScroll:Boolean = false;

  constructor() { }

  ngOnInit() {
    console.log(window.innerWidth)
    if(window.innerWidth<600) this.enableScroll = true;
  }

  navChange(value){
    this.select.emit(value.detail.value);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(window.innerWidth<600) 
      this.enableScroll = true;
    else
      this.enableScroll = false;
  }

}
