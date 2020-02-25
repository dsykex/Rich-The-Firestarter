import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AlertController } from '@ionic/angular';

import * as firebase from 'firebase';
import { HomePage } from '../home/home.page';
import {AuthService} from '../auth.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'landing',
  templateUrl: 'landing.page.html',
  styleUrls: ['./landing.page.scss']
})

export class LandingPage implements OnInit
{
  constructor(public authService: AuthService, public router: Router, public alertCtrl: AlertController)
  {
 
  }

  ngOnInit()
  {
    this.authService.getUserInfo().then(user => {
      console.log(user);
      if(user.email)
      {
        this.router.navigateByUrl('/home');
      }else
      {
        this.router.navigateByUrl('/login');
      }
    });
  }

}
