import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNavbarComponent } from './my-navbar/my-navbar.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MyNavbarComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[MyNavbarComponent]
})
export class SharedModule { }
