import React, { Component } from 'react'
import { Row, Col, Input, Button, CardPanel } from 'react-materialize'

export default class AddSongContainer extends Component {
  state = {
    name: '',
    artist: '',
    url: '',
    image: ''
  }
  componentDidMount() {
  }
  handleChange = (event) => { // arrow function to bind to Component
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
     [name]: value
    });
  }
  render() {
    return (
      <div>
        <CardPanel>
          <Row>
            <Input s={6} label="Name" name="name" value={this.state.name} onChange={this.handleChange} />
            <Input s={6} label="Artist" name="artist" value={this.state.artist} onChange={this.handleChange} />
            <Input s={12} label="URL" name="url" value={this.state.url} onChange={this.handleChange} />
            <Input s={12} label="Cover URL" name="image" value={this.state.image} onChange={this.handleChange} />
          </Row>
          <Row className="center-align">
            <Button waves="light">Add</Button>
          </Row>
        </CardPanel>
      </div>
    )
  }
}
