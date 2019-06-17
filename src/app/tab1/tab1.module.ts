import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ListaPlatosComponent } from './lista-platos/lista-platos.component';
import { TablaPlatosComponent } from './tabla-platos/tabla-platos.component';
import { PlatosService } from '../services/platos.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }]),
    SharedModule
  ],
  declarations: [Tab1Page,ListaPlatosComponent,TablaPlatosComponent],
  providers:[PlatosService]
})
export class Tab1PageModule {}
