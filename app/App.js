import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ListItemLink from './baseComponents/ListItemLink'
import { Navbar } from 'react-materialize'

// import styles
import './style.css'

import MusicLibraryContainer from './containers/MusicLibraryContainer'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Navbar brand='Music App' right>
            <ListItemLink exact to="/">Library</ListItemLink>
            <ListItemLink to="/about">About</ListItemLink>
          </Navbar>

          <div className="container">
            <Route exact path='/' component={MusicLibraryContainer} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

const About = () => <h1>About</h1>

export default App
