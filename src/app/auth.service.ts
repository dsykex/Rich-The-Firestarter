import { Injectable } from '@angular/core';
import * as firebase from './fbconfig';
import { Observable } from 'rxjs';

export interface tvarr {
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public getUserInfo() : Promise<any>
  {
    let userObs = new Promise(resolve => {
      firebase.default.auth().onAuthStateChanged(authData => {
        if(!authData)
        {
          resolve({});
        }
        else
        {
          let db = firebase.default.firestore().collection('users');
          db.where('email', '==', authData.email).get().then(user => { 
            user.docChanges().forEach(u => {
              let user = u.doc.data();
              user['id'] = u.doc.id;
              
              resolve(user);
            })
          })
        } 
      })
    });

    return userObs;
  }

  public isAdmin(user)
  {
    return user.rank == 'a';
  }
}