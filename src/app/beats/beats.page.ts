import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-beats',
  templateUrl: './beats.page.html',
  styleUrls: ['./beats.page.scss'],
})
export class BeatsPage implements OnInit {

  constructor(public navCtrl: NavController, public functions: FunctionsService) { }

  ngOnInit() {

  }

 

}
