import React, { Component } from 'react'
import { Display1, Textfield } from 'react-mdc-web'

import YoutubeList from '../components/YoutubeList'
import { search } from '../model/YoutubeModel'

export default class ExploreContainer extends Component {
  state = {
    query: '',
    tracks: []
  }
  componentDidMount() {

  }
  getResult(query) {
    search(query)
      .then(tracks => {
        this.setState({tracks})
      })
  }
  handleOnChange = (e) => {
    this.setState({query: e.target.value})
  }
  handleKeyPress = (e) => {
    if(e.key == 'Enter'){
      this.getResult(this.state.query)
    }
  }
  addYoutubeSong = (index) => {
    const newSong = this.state.tracks[index]
    this.props.addSong({
      id: newSong.id,
      url: `http://192.168.1.136:3000?v=${newSong.id}`,
      cover: newSong.thumbnails.default.url,
      artist: newSong.channelTitle,
      title: newSong.title
    })
  }
  render() {
    return (
        <div className="row" style={{margin: 10}}>
          <div className="col-xs-12 col-md-6 col-md-offset-3">
            <Display1>Explore</Display1>
            <Textfield floatingLabel="Search" value={this.state.query} onChange={this.handleOnChange} onKeyPress={this.handleKeyPress}/>
            <YoutubeList tracks={this.state.tracks} addYoutubeSong={this.addYoutubeSong} />
          </div>
        </div>
    )
  }
}
