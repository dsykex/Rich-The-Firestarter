import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import * as firebase from '../fbconfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: any = {};
  public errorMsg: any = false;

  constructor(public router: Router, public authService: AuthService, public alertCtrl: AlertController) { }

 

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

  login()
  {
    firebase.default.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then(() => {
      this.router.navigateByUrl('/home');
    }).catch(()=> {
      this.errorMsg = 'An error occured. Please check your login credentials and network and try again.';
      setTimeout(() => {
        this.errorMsg = '';
      },3000);
    });
  }

  async signup()
  {
      const alert = await this.alertCtrl.create({
        header: 'Welcome!',
        inputs: [
          {
            name: 'first_name',
            type: 'text',
            placeholder: 'First Name'
          },
          {
            name: 'last_name',
            type: 'text',
            placeholder: 'Last Name'
          },
          {
            name: 'display_name',
            type: 'text',
            placeholder: 'Display Name'
          },
          {
            name: 'email',
            type: 'email',
            placeholder: 'Email'
          },
          {
            name: 'password',
            type: 'password',
            placeholder: 'Password'
          },
          {
            name: 'confirm_password',
            type: 'password',
            placeholder: 'Confirm Password'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              
            }
          }, {
            text: 'Create Account',
            handler: (data) => {
              console.log(data);
              if(data.email && data.first_name && data.last_name && data.display_name && data.password && data.confirm_password)
              {
                if(data.password == data.password)
                {
                  let db = firebase.default.firestore();
                  let users = db.collection('users');
                  firebase.default.auth().createUserWithEmailAndPassword(data.email, data.password).then(()=>{
                    console.log('created!');
                    let newUser = {
                      first_name: data.first_name,
                      last_name: data.last_name,
                      display_name: data.display_name,
                      email: data.email,
                      password: data.password,
                      createdAt: Date.now(),
                      rank: 'm'
                    };

                    // Successful Account Creation and Login
                    users.add(newUser).then(()=> {
                      firebase.default.auth().signInWithEmailAndPassword(data.email, data.password).then(() => {
                        this.router.navigateByUrl('/home');
                      });
                    }).catch(() => { });
                  }).catch(()=> {
                    this.errorMsg = 'An error occured processing your request. Either an an account exists under that email, a network related problem, or something internal. Please try again.';
                    setTimeout(() => {
                      this.errorMsg = '';
                    },3000);
                  })
                }
                else
                {
                  this.errorMsg = 'Passwords must match.';
                  setTimeout(() => {
                    this.errorMsg = '';
                  },3000);
                }
              }
              else
              {
                this.errorMsg = 'All fields are required.';
                setTimeout(() => {
                  this.errorMsg = '';
                },3000);
              }
            }
          }
        ]
      });
  
      await alert.present();
  }

}
