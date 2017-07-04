import axios from 'axios'
import firebase from 'firebase'
import ytdl from 'ytdl-core'

var config = {
  apiKey: "AIzaSyBzcUCCLfBskFJNpULOCMWsfvLgl7c54LM",
  authDomain: "terence-music.firebaseapp.com",
  databaseURL: "https://terence-music.firebaseio.com/",
  storageBucket: "terence-music.appspot.com",
};
firebase.initializeApp(config);

// var database = firebase.database();

export function getSongs() {
  return axios.get('/songs.json')
    .then(response => response.data.slice(0,10))
}

export function getFbSongs(cb) {
    axios.get('/default.json')
      .then(response => cb(response.data))
  // database.ref('/playlist/default').limitToFirst(30).orderByKey()
  //   .on('value', cb)
}

export function getYTSongs(vid) {
  // return new Promise((res,rej) => {
  //   res({url: `http://localhost:8000/test.mp3`})
  // })
  const url = `https://www.youtube.com/watch?v=${vid}`
  const opts = {filter: 'audioonly'}
  return ytdl.getInfo(url)
    .then(info => ytdl.chooseFormat(info.formats,opts))
}

export function getConfig(cb) {
  database.ref('/config')
    .on('value', cb)
    // .then(snapshot => snapshot.val())
}

export function addFbSongs(song) {
  let newSong = database.ref('/playlist/default').push()
  newSong.set(song)
}

export function prefetch_file(url, progress_callback) {
  return new Promise((resolve, reject) => {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";

    xhr.addEventListener("loadstart", function () {
      if (xhr.status === 200) {
        var URL = window.URL || window.webkitURL;
        var blob_url = URL.createObjectURL(xhr.response);
        resolve(blob_url);
      } else {
        reject();
      }
    }, false);

    var prev_pc = 0;
    xhr.addEventListener("progress", function(event) {
      if (event.lengthComputable) {
        var pc = Math.round((event.loaded / event.total) * 100);
        if (pc != prev_pc) {
          prev_pc = pc;
          if(progress_callback) progress_callback(pc);
        }
      }
    });

    xhr.send();
  })
}

export default {
  getSongs,
  getFbSongs,
  prefetch_file,
  addFbSongs,
  getConfig,
  getYTSongs
}
