import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ListItemLink from './baseComponents/ListItemLink'
import { Toolbar, ToolbarRow, ToolbarSection, ToolbarTitle } from 'react-mdc-web'

// import styles
import 'material-components-web/dist/material-components-web.css'
import 'flexboxgrid/dist/flexboxgrid.css'
import './style.css'
import './musicPlayer.scss'

import MusicLibraryContainer from './containers/MusicLibraryContainer'
import AddSongContainer from './containers/AddSongContainer'
import ExploreContainer from './containers/ExploreContainer'

import MusicPlayer from './components/MusicPlayer'
import SongModel from './model/SongModel'

class App extends Component {
  state = {
    active: null,
    songs: []
  }
  componentDidMount = () => {

    SongModel.getFbSongs(songs => {
      var songs = Object.values(songs)
      this.setState({songs})
    })
  }
  playSong = (index) => {
    let song = this.state.songs[index]
    SongModel.getYTSongs(song.id)
      .then(info => {
        song.url = info.url
        this.setState({active: song})
      })
  }
  findIndex = (id) => {
    return Array.prototype.findIndex.call(this.state.songs, song => song.id == id )
  }
  playNext = () => {
    let { active, songs } = this.state
    const nextIndex = (this.findIndex(active.id) + 1) % songs.length
    this.playSong(nextIndex)
  }
  playPrevious = () => {
    let { active, songs } = this.state
    const prevIndex = (this.findIndex(active.id) - 1 + songs.length) % songs.length
    this.playSong(prevIndex)
  }
  addSong = (song) => {
    // this.setState({songs: [...this.state.songs, song]})
    SongModel.addFbSongs(song)
  }
  render () {
    return (
      <Router>
        <div>
          <Toolbar fixed>
            <ToolbarRow>
              <ToolbarSection align="start">
                <a href="#" className="material-icons mdc-toolbar__icon--menu">menu</a>
                <ToolbarTitle>Music App</ToolbarTitle>
              </ToolbarSection>
              <ToolbarSection align="end">
                <Link to="/explore" className="material-icons mdc-toolbar__icon">add</Link>
                <Link to="/" className="material-icons mdc-toolbar__icon">library_music</Link>
                <Link to="/about" className="material-icons mdc-toolbar__icon">mail</Link>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <div style={{paddingTop: 56, paddingBottom: 84}}>
            <Route exact path='/' render={(props) => <MusicLibraryContainer tracks={this.state.songs} playSong={this.playSong} {...props} />} />
            <Route path='/add_song' component={AddSongContainer} />
            <Route path='/explore' render={(props) => <ExploreContainer addSong={this.addSong} {...props} />} />
            <Route path='/about' component={About} />
          </div>
          <MusicPlayer autoplay={false} active={this.state.active} playPrevious={this.playPrevious} playNext={this.playNext} />
        </div>
      </Router>
    )
  }
}

const About = () => <h1>About</h1>

export default App
