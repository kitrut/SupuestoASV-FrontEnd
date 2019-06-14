import { Component } from '@angular/core';
import { PlatosService } from '../services/platos.service';
import { Plato } from '../models/plato';
import { ModalController } from '@ionic/angular';
import { ModalCrearPlatoPage } from '../tab1/modal-crear-plato/modal-crear-plato.page';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  platos:Plato[];
  constructor(private platoService: PlatosService,private modalController:ModalController) {

  }

  ngOnInit(){
    this.getData();
  }

  setFilteredItems(opt) {
    this.platos = this.platoService.filterItems(opt);
  }

  getData(){
    this.platoService.getPlatosFromServer().subscribe(
      data =>{
        this.platos = data;
      }
    )
  }
  deletePlato(id){
    this.platoService.deletePlato(id).subscribe(
      res =>{
        this.getData();
      },
      err =>{
        console.log("Error "+ err)
      }
    )
  }

  async postPlato(){
    const modal = await this.modalController.create({
      component: ModalCrearPlatoPage,
      cssClass:'mymodal',
      componentProps:{
        publicacion : ""        
      }
    });
    await modal.present();
    await modal.onDidDismiss(); this.getData();
  }

}
