import axios from 'axios'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBzcUCCLfBskFJNpULOCMWsfvLgl7c54LM",
  authDomain: "terence-music.firebaseapp.com",
  databaseURL: "https://terence-music.firebaseio.com/",
  storageBucket: "terence-music.appspot.com",
};
firebase.initializeApp(config);

var database = firebase.database();

export function getSongs() {
  return axios.get('/songs.json')
    .then(response => response.data.slice(0,10))
}

export function getFbSongs() {
  return database.ref('/playlist/default').orderByChild('order')
    .once('value')
    .then(snapshot => snapshot.val())
}

export default {
  getSongs,
  getFbSongs
}
