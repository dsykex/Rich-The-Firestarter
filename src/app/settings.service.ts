import { Injectable } from '@angular/core';
import * as firebase from './fbconfig';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public static getSettings(): Promise<any> {
    let db = firebase.default.firestore();
    let settings = db.collection('settings');

    let settings_prom = new Promise(resolve => {
      settings.get().then(settings => {
        resolve(settings.docs[0].data());
      })
    })

    return settings_prom;
  }
}
