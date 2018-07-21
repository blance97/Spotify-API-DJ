import express from 'express';
let router = express.Router();


// spotifyApi.clientCredentialsGrant()
//     .then(function (data) {
//         console.log('The access token is ' + data.body['access_token']);
//         spotifyApi.setAccessToken(data.body['access_token']);
//     }, function (err) {
//         console.log('Something went wrong!', err);
//     });

// router.put("/addSong", (req, res) => {
//     spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
//         function (data) {
//             console.log('Artist albums', data.body);
//         },
//         function (err) {
//             console.error(err);
//         }
//     );
//     res.json(req.body)
// });

module.exports = router;