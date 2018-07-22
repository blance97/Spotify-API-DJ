import express from 'express';
let router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var scopes = ['user-read-private','user-read-playback-state', 'user-read-email', 'playlist-modify-private', 'playlist-modify-public'],
  redirectUri = 'http://localhost:8080/api/auth/callback',
  clientId = '9c44412e9ae2422c81555e6c397c90de',
  clientSecret = '10e5e761166a43be82afe15fbfb259f9',
  state = 'spotify_auth_state';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: clientSecret
});

// Create the authorization URL

var tokenExpirationEpoch;
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);


router.get('/login', (req, res) => {

  console.log(authorizeURL)
  res.redirect(authorizeURL)  
});
/* Handle authorization callback from Spotify */
router.get('/callback', (req, res) => {
  console.log("fdsfds")
  
  /* Read query parameters */
  var code = req.query.code; // Read the authorization code from the query parameters
  var state = req.query.state; // (Optional) Read the state from the query parameter
  console.log(`code ${code}`)
  /* Get the access token! */
  spotifyApi.authorizationCodeGrant(code).then( (data) => {
    data = data['body']
    console.log(data)
    console.log('The token expires in ' + data['expires_in']);
    console.log('The access token is ' + data['access_token']);
    console.log('The refresh token is ' + data['refresh_token']);
    res.cookie("access_token", data['access_token']);
    /* Ok. We've got the access token!
       Save the access token for this user somewhere so that you can use it again.
       Cookie? Local storage?
    */

    /* Redirecting back to the main page! :-) */
    res.redirect(`http://localhost:3000`);
  }),
  (err) => {
    console.log(err)
    res.status(err.code);
    res.send(err.message);
  };
});


module.exports = router;