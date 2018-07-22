import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { withCookies, Cookies } from 'react-cookie';
var SpotifyWebApi = require('spotify-web-api-node');
const cookies = new Cookies();
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    spotifyApi.setAccessToken(cookies.get('access_token'));
    console.log("set: " + cookies.get('access_token'))
  }

  findPlaylist(userId, playlistName, limit, offset) {
    let d = [];
    spotifyApi.getUserPlaylists(userId, { limit, offset })
      .then((data) => {
        let playlists = data.body.items
        playlists.forEach(element => {
          console.log(element.name)
          if (element.name === playlistName) {
            console.log('found' + element)
            // return element
          }
        });
        if (data.body.next === null) {
          return;
        } else {
          this.findPlaylist(userId, playlistName, limit, offset += limit)
        }
        console.log('Some information about this playlist', data.body);
      });
  }


  getUser() {
    spotifyApi.getMe().then((response) => {
      console.log(response)
      this.findPlaylist(response['body']['id'], "My Cool Playlist", 20, 0)
      spotifyApi.getMyCurrentPlaybackState({
      })
        .then(function (data) {
          // Output items
          console.log("Now Playing: ", data.body);
        }, function (err) {
          console.log('Something went wrong!', err);
        });
      // spotifyApi.createPlaylist(response['body']['id'], 'My Cool Playlist', { 'public': false })
      // .then(function (data) {
      //   console.log('Created playlist!');
      // }, function (err) {
      //   console.log('Something went wrong!', err);
      // });
    }, (err) => {
      console.log('Something went wrong!', err);
    });
  }

  render() {
    this.getUser();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href='http://localhost:8080/api/auth/login'> Login to Spotify </a>
      </div>
    );
  }
}

export default App;
