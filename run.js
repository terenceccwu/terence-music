var SpotifyWebApi = require('spotify-web-api-node');
var Promise = require('promise');
const fs = require('fs');


// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId : '6fec5d65ca8844c181718e7feffa144a',
  clientSecret : '85cab15ce9bb449ba4e3a63eb3379fb6',
  redirectUri : 'http://localhost/'
});

// spotifyApi.refreshAccessToken()
//   .then(() => spotifyApi.searchTracks('kasaneteku'))

// spotifyApi.setAccessToken(token);
//
// spotifyApi.searchTracks('kasaneteku')
//   .then(function(data) {
//     console.log(data.body);
//   }, function(err) {
//     console.error(err);
//   });


// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);
    token = data.body['access_token']

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  })
  .then(() => spotifyApi.getPlaylist('spotify', '37i9dQZF1DX5CHqBODmn2c'))
  .then(function(data) {
    var jsonFile = fs.createWriteStream('./output.json')
    jsonFile.write(JSON.stringify(data.body));
    console.log('done');
  }, function(err) {
    console.error(err);
  });
