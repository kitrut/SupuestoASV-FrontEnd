import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { Storage } from  '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private  router:  Router,private storage:Storage) { }

  async getUsuario(){
    return this.storage.get("Atendiendo");
  }

  login(form){
    this.storage.set("Atendiendo",form.email);
    this.router.navigateByUrl('tabs');
    //return null;
  }

  logout(){
    this.storage.remove("Atendiendo");
    this.router.navigateByUrl('');
  }

  isLoggedIn():Boolean{
    return true;
  }
}
