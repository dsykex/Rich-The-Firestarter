import { Injectable } from '@angular/core';
import * as firebase from './fbconfig';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  public getSettings(param) {
    let db = firebase.default.firestore();
    let settings = db.collection('settings');

    settings.get().then(settings => {
      return settings.docs[0].data()[param];
    })
  }
}
