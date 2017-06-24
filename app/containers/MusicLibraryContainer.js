import React, { Component } from 'react'
import SongList from '../components/SongList'

import SongModel from '../model/SongModel'

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
    SongModel.getSongs()
      .then(tracks => {
        this.setState({tracks})
      })
  }
}
