import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor() { }

  pop(navCtrl: NavController)
  {
    navCtrl.back();
  }
}
