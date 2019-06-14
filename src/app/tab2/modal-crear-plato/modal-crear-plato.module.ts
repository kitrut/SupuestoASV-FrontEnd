import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModalCrearPlatoPage } from './modal-crear-plato.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCrearPlatoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ModalCrearPlatoPage]
})
export class ModalCrearPlatoPageModule {}
