import React, { Component } from 'react'
import { Row, Col, Table, Badge } from 'react-materialize'
import axios from 'axios'

const SongList = (props) => (
  <Row>
    <Col s={12} m={8} offset="m2">
      <h3>Library</h3>
      <Table hoverable>
        <tbody>
          {props.tracks.map(renderRow)}
        </tbody>
      </Table>
    </Col>
  </Row>
)

function renderRow(track, i) {
  return (
    <tr key={i}>
      <td className="center-align"><img src={track.image} width="50"/></td>
      <td>
        <div>
          {track.name} - <small>{track.artist}</small><br />
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

export default SongList
