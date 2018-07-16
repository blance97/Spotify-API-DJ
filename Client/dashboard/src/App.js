import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import { withCookies, Cookies } from 'react-cookie';
var SpotifyWebApi = require('spotify-web-api-node');
const cookies = new Cookies();

class App extends Component {


  render() {
    var spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(cookies.get('access_token'));
    console.log("set")

    spotifyApi.createPlaylist('thelinmichael', 'My Cool Playlist', { 'public' : false })
    .then(function(data) {
      console.log('Created playlist!');
    }, function(err) {
      console.log('Something went wrong!', err);
    });
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <a href='http://localhost:8080/api/auth/login' > Login to Spotify </a>
      </div>
    );
  }
}

export default App;
