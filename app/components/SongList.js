import React, { Component } from 'react'
import { Table } from 'react-materialize'
import axios from 'axios'

const SongList = (props) => (
  <Table hoverable>
    <thead>
      <tr>
        <th style={{width:'5%'}}></th>
        <th style={{width:'30%'}}>Name</th>
        <th style={{width:'10%'}}>xx:xx</th>
        <th style={{width:'20%'}}>Artist</th>
      </tr>
    </thead>

    <tbody>
      {props.tracks.map(renderRow)}
    </tbody>
  </Table>
)

function renderRow(track, i) {
  return (
    <tr key={i}>
      <td className="center-align"><img src={track.image} width="50"/></td>
      <td>{track.name}</td>
      <td>{msToTime(track.duration_ms)}</td>
      <td>{track.artist}</td>
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
