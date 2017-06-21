import axios from 'axios'

export function getSongs() {
  return axios.get('/songs.json')
    .then(response => response.data.slice(0,10))
}


export default {
  getSongs
}
