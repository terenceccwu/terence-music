import firebase from firebase

var config = {
  apiKey: "AIzaSyBzcUCCLfBskFJNpULOCMWsfvLgl7c54LM",
  authDomain: "terence-music.firebaseapp.com",
  databaseURL: "https://terence-music.firebaseio.com/",
  storageBucket: "terence-music.appspot.com",
};

firebase.initializeApp(config);
var database = firebase.database();

database.ref()
