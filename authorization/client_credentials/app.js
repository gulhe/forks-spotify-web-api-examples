/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
 */
const {client_id,client_secret} = require('./credentials');

function getToken() {
  return fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    body: new URLSearchParams({
      'grant_type': `client_credentials`,
    }),
    headers: {
      'Content-Type': `application/x-www-form-urlencoded`,
      'Authorization': `Basic ${Buffer.from(client_id + ':' + client_secret).toString('base64')}`,
    },
  }).then(x=>x.json());
}

function getTrackInfo(access_token) {
  return fetch(`https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT`, {
    method: `GET`,
    headers: {'Authorization': `Bearer ${access_token}`},
  }).then(x=>x.json());
}

getToken()
    .then(response => response.access_token)
    .then(getTrackInfo)
    .then(JSON.stringify)
    .then(console.log)
