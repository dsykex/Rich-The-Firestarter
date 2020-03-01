import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { AlertController, NavController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';

@Component({
  selector: 'app-book-session',
  templateUrl: './book-session.page.html',
  styleUrls: ['./book-session.page.scss'],
})
export class BookSessionPage implements OnInit {
  public user: any;
  public session: any = {};
  public sessions: any = [];
  currentYear: any = new Date().getFullYear();

  public price:number = 0;

  constructor(public router: Router, public navCtrl: NavController, public functions: FunctionsService, public settings: SettingsService, public authService: AuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.settings.getSettings('pricePerHour');
  }

}
