import React, { Component } from 'react'
import axios from 'axios'
import SongList from '../components/SongList'

export default class MusicLibraryContainer extends Component {
  state = {
    tracks: []
  }
  componentDidMount() {
    this.getSongs()
  }
  render() {
    return (
      <div>
        <SongList tracks={this.state.tracks}/>
      </div>
    )
  }
  getSongs() {
    axios.get('/songs.json')
      .then(response => response.data.slice(0,10))
      .then(tracks => {
        this.setState({tracks})
      })
  }
}
