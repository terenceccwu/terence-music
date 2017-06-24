import React, { Component } from 'react'
import axios from 'axios'

const YoutubeList = (props) => (
  <table style={{width:'100%', fontSize:'80%'}}>
    <tbody>
      {props.tracks.map(renderRow)}
    </tbody>
  </table>
)

function renderRow(track, i) {
  return (
    <tr key={i} style={{height:70}}>
      <td className="center-align"><img src={track.thumbnails.default.url} width="100%"/></td>
      <td style={{padding:10}}>
        <div>
          {track.title}
        </div>
        <div>
          <small><span style={{color:'#1DA1F2'}}>{track.channelTitle}</span> - {track.publishedAt.substr(0,10)}</small>
        </div>
      </td>
      <td style={{color:'grey',fontSize:10, textAlign: 'center'}}>
        <i className="material-icons">{ Math.random() > 0.5 ? 'favorite_border' : 'favorite'}</i>
        <br />
        10
      </td>
    </tr>
  )
}

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

export default YoutubeList
