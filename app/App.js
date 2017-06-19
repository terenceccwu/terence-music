import React, { Component } from 'react'
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ListItemLink from './baseComponents/ListItemLink'
import { Button, Icon, Navbar } from 'react-materialize'

// import styles
import './style.css'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Navbar brand='logo' right>
            <ListItemLink exact to="/">Home</ListItemLink>
            <ListItemLink to="/about">About</ListItemLink>
          </Navbar>

          <div className="container">
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <h1>Home</h1>

            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Card Title</span>
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
              </div>
            </div>

            <Button waves='light'>Component</Button>
            &nbsp;
            <a className="waves-effect waves-light btn">Class Name</a>
          </div>
        </div>
      </div>
    )
  }
}
const About = () => <h1>About</h1>

export default App
