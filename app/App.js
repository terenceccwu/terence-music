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

import MusicLibraryContainer from './containers/MusicLibraryContainer'
import AddSongContainer from './containers/AddSongContainer'

// <Navbar brand='Music App' right className="top-nav" options={{closeOnClick: true}}>
//             <ListItemLink exact to="/">Library</ListItemLink>
//             <ListItemLink exact to="/add_song">Add Song</ListItemLink>
//             <ListItemLink to="/about">About</ListItemLink>
//           </Navbar>
//
//           <div className="container main-container">
//             <Route exact path='/' component={MusicLibraryContainer} />
//             <Route path='/add_song' component={AddSongContainer} />
//             <Route path='/about' component={About} />
//           </div>

class App extends Component {
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
                <Link exact to="/add_song" className="material-icons mdc-toolbar__icon">add</Link>
                <Link exact to="/" className="material-icons mdc-toolbar__icon">library_music</Link>
                <Link to="/about" className="material-icons mdc-toolbar__icon">mail</Link>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <div style={{paddingTop: 56}}>
            <Route exact path='/' component={MusicLibraryContainer} />
            <Route path='/add_song' component={AddSongContainer} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

const About = () => <h1>About</h1>

export default App
