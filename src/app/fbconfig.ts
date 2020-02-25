import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAT2j-HxrOKxnTS8m7yotXnrl0mJADJiMk",
    authDomain: "firestarter-9c73c.firebaseapp.com",
    databaseURL: "https://firestarter-9c73c.firebaseio.com",
    projectId: "firestarter-9c73c",
    storageBucket: "firestarter-9c73c.appspot.com",
    messagingSenderId: "115304164573",
    appId: "1:115304164573:web:17636e649d78794aff7f34"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();