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

class App extends Component {
  state = {
    current: 0,
    songs: [{
      url: "https://drive.google.com/uc?id=0B-mMjiNWrFgpX2FVSjF2V0dGOGM",
      cover: "https://i1.sndcdn.com/artworks-000103636612-9z7z4n-t500x500.jpg",
      artist: {
        name: 'artist 2',
        song: 'song 2'
      }
    },{
      url: "https://drive.google.com/uc?id=0B-mMjiNWrFgpRXU0NEdCMS1EUFU",
      cover: "https://i.scdn.co/image/763264d7a2db4d99c6bcf6487ffc29e728c2c187",
      artist: {
        name: 'Red Velvet',
        song: '러시안 룰렛 Russian Roulette'
      }
    }]
  }
  componentDidMount = () => {

  }
  playNext = () => {
    this.setState((prevState, props) => ({current: (prevState.current + 1) % prevState.songs.length}))
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
            <Route exact path='/' component={MusicLibraryContainer} />
            <Route path='/add_song' component={AddSongContainer} />
            <Route path='/explore' component={ExploreContainer} />
            <Route path='/about' component={About} />
          </div>
          <MusicPlayer autoplay={true} songs={this.state.songs} current={this.state.current} playNext={this.playNext} />
        </div>
      </Router>
    )
  }
}

const About = () => <h1>About</h1>

export default App
