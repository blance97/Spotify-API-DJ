import express from 'express';
let router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '9c44412e9ae2422c81555e6c397c90de',
    clientSecret: '10e5e761166a43be82afe15fbfb259f9',
    redirectUri: 'http://localhost:8080/callback'
});

spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Something went wrong!', err);
    });

router.put("/addSong", (req, res) => {
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
        function (data) {
            console.log('Artist albums', data.body);
        },
        function (err) {
            console.error(err);
        }
    );
    res.json(req.body)
});

module.exports = router;