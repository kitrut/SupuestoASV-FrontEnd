import { Component } from '@angular/core';
import { PlatosService } from '../services/platos.service';
import { Plato } from '../models/plato';
import { ModalController } from '@ionic/angular';
import { ModalCrearPlatoPage } from './modal-crear-plato/modal-crear-plato.page';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  platos:Plato[];
  navSelected:string='';
  constructor(private platoService: PlatosService,private modalController:ModalController,private authService:AuthService) {

  }

  ngOnInit(){
    this.getData();
  }
  ionViewWillEnter(){
    this.authService.isLoggedIn();
  }

  setFilteredItems(opt) {
    this.navSelected=opt;
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
      cssClass:'mymodal'
    });
    await modal.present();
    await modal.onDidDismiss(); this.getData();
  }

  async showModalUpdate(plato:Plato){
    const modal = await this.modalController.create({
      component: ModalCrearPlatoPage,
      cssClass:'mymodal',
      componentProps:{
        inputPlato : plato        
      }
    });
    await modal.present();
    await modal.onDidDismiss(); this.getData();
  }

}
