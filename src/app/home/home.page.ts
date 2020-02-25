import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public slideOpts = {
    effect: 'flip',
    speed: 350
  }

  @ViewChild("slides", {static: false}) slides: IonSlides;
  public slideBgs : any = ['../../assets/imgs/studio.jpg', '../../assets/imgs/beats.jpg']
  slideImg: any;
  user: any = {};

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit()
  {
    this.slideImg = this.slideBgs[0];
    this.authService.getUserInfo().then(userInfo => {
      if(userInfo.email)
      {
        this.user = userInfo;
        console.log(this.authService.isAdmin(this.user));
      }
      else
      {
        this.router.navigateByUrl('/login');
      }
    })
  }

  async slideChanged()
  {
    let index = await this.slides.getActiveIndex();
    console.log(this.authService.isAdmin(this.user));
    this.slideImg = this.slideBgs[index];
  }

  openLink(url)
  {

  }
}
