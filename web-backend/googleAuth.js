'use strict';
// const path = require('path');
const http = require('http');
const url = require('url');
const opn = require('open');
const destroyer = require('server-destroy');

const {google} = require('googleapis');
// const people = google.people('v1');
const axios = require('axios');


const secrets = require('./secrets');

/**
 * To use OAuth2 authentication, we need access to a CLIENT_ID, CLIENT_SECRET, AND REDIRECT_URI.  To get these credentials for your application, visit https://console.cloud.google.com/apis/credentials.
 */
/**
 * Create a new OAuth2 client with the configured keys.
 */
const oauth2Client = new google.auth.OAuth2(
    secrets.client_id,
    secrets.client_secret,
    'http://localhost:3001/oauth2callback',
);

/**
 * This is one of the many ways you can configure googleapis to use authentication credentials.
 * In this method, we're setting a global reference for all APIs.
 * Any other API you use here, like google.drive('v3'), will now use this auth client.
 * You can also override the auth client at the service and method call levels.
 */
google.options({auth: oauth2Client});

/**
 * Open an http server to accept the oauth callback.
 * In this simple example, the only request to our webserver is to /callback?code=<code>
 */
async function authenticate(scopes) {
  return new Promise((resolve, reject) => {
    // grab the url that will be used for authorization
    const authorizeUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });

    const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf('/oauth2callback') > -1) {
              const qs = new url.URL(req.url, 'http://localhost:3001')
                  .searchParams;
              res.end('Authentication successful! Please return to the console.');
              server.destroy();
              const {tokens} = await oauth2Client.getToken(qs.get('code'));
              console.log(tokens);
              oauth2Client.credentials = tokens;
              resolve(oauth2Client);
              console.log('Done');
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(3001, () => {
        // open the browser to the authorize url to start the workflow
          opn(authorizeUrl, {wait: false}).then((cp) => cp.unref());
        });
    try {
      destroyer(server);
    } catch (err) {
      console.log('Error: ' + err);
    }
  });
}

async function runSample(client) {
  const options = {
    method: 'GET',
    url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves?key=${secrets.google_books_api}`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${client.credentials.access_token}`,
    },
  };

  axios.request(options).then(function(response) {
    console.log(response.data);
  }).catch(function(error) {
    console.error(error);
  });
}

const scopes = [
  'https://www.googleapis.com/auth/contacts.readonly',
  'https://www.googleapis.com/auth/user.emails.read',
  'profile',
  'https://www.googleapis.com/auth/books',
];

authenticate(scopes)
    .then((client) => {
      runSample(client);
    })
    .catch(console.error);
