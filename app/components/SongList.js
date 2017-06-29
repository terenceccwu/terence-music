import React, { Component } from 'react'
import { Display1 } from 'react-mdc-web'
import axios from 'axios'

const SongList = (props) => (
  <div className="row" style={{margin: 10}}>
    <div className="col-xs-12 col-md-6 col-md-offset-3">
      <Display1>Library</Display1>
      <table style={{width:'100%', fontSize:'80%'}}>
        <tbody>
          {props.tracks.map((track,i) => <SongRow track={track} index={i} playSong={props.playSong} key={i} />)}
        </tbody>
      </table>
    </div>
  </div>
)

const SongRow = ({ track, index, playSong }) => (
  <tr key={index} style={{height:70}}>
    <td onClick={() => playSong(index)} className="center-align" style={{cursor:'pointer'}}>
      <img src={track.cover} width="50"/>
    </td>
    <td style={{padding:10}}>
      <div>
        {track.title} <small style={{color:'grey'}}>- {track.artist}</small>
      </div>
      <div>
        <small><span style={{color:'#1DA1F2'}}>@terence</span> - 10 day</small>
      </div>
    </td>
    <td style={{color:'grey',fontSize:10, textAlign: 'center'}}>
      <i className="material-icons">{ Math.random() > 0.5 ? 'favorite_border' : 'favorite'}</i>
      <br />
      10
    </td>
  </tr>
)

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ('00' + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;

  return pad(mins) + ':' + pad(secs);
}

export default SongList
