import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SettingsService } from '../settings.service';
import { AlertController, NavController } from '@ionic/angular';
import { FunctionsService } from '../functions.service';

import * as firebase from '../fbconfig';

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
  public settings: any = {};

  constructor(public router: Router, public navCtrl: NavController, public functions: FunctionsService, public authService: AuthService, public alertCtrl: AlertController) { }

  ngOnInit() {
    this.authService.getUserInfo().then(userInfo => {
      if(userInfo.email)
      {
        this.user = userInfo;

        SettingsService.getSettings().then(settings => {
          this.settings = settings;
          console.log(this.settings);
        });
     
        let db = firebase.default.firestore();
        let sessions = db.collection('sessions');

        sessions.where('user' , '==', userInfo.email).get().then(userSession => {
          if(userSession.size >= 1)
          {
            let alert = this.alertCtrl.create({
              message: 'You have a session booked already.',
              buttons: [{
                text: 'Ok',
                handler: () => {
                  this.navCtrl.back();
                }
              }]
            })
          }
          else
          {
            console.log(`No Sessions for ${this.user.email}`)
          }
        })
      }
      else
      {
       this.navCtrl.navigateBack('/login');
      }
    })
    
  }

  public toStandardTime(time: string)
  {
    var timeSplit = time.split(':');
    var hours = Number(timeSplit[0]);
    var minutes = Number(timeSplit[1]);

    // calculate
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
  
    return timeValue;
  }


  public updateSessionInfo(time:string)
  {

    if(time)
    {
      let sessionDate = new Date(this.session.date).toLocaleDateString();
      let sessionTime = new Date(this.session.sTime).toLocaleTimeString();

      var date = Date.parse(sessionDate + ', ' + sessionTime);

      console.log(date);

      this.price = this.session.hours * this.settings.pricePerHour;
      this.session.endDate = new Date(date+(this.session.hours * 3600000)).toDateString();
      var sTime = this.toStandardTime(this.session.sTime); 
      this.session.endTime = this.toStandardTime(new Date(date+(this.session.hours * 3600000)).toTimeString());
      this.session.startTime = sTime;
    }
  }


}
