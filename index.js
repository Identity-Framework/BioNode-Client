
//"https://user1.databox.me/profile/card#me";
//"https://user2.databox.me/profile/card#me";
// "ldnode": "^0.2.14",
// var ldnode = require('ldnode');
var express = require('express');
var fs = require('fs');
var http = require('http');
var https = require('https');

// These need to be relative
var KEY_PATH = 'keys/key.pem';
var CERT_PATH = 'keys/cert.pem';
var ROOT_PATH = '/ldresources';
var PORT = 3000;

var PRIVATE_KEY = fs.readFileSync(KEY_PATH);
var CERT = fs.readFileSync(CERT_PATH);

var credentials = {
    requestCert: true,
    key: PRIVATE_KEY,
    cert: CERT
};

// Create the express app
var app = express();

// Do the app routing here
app.get('/', function (req, res) {
    console.log('GET request /');
    var cert = req.connection.getPeerCertificate();
    console.log(cert);
    res.send('GET request /');
})

app.get(ROOT_PATH, function (req, res) {
    console.log('GET request /ldresources');
    res.send('GET request /ldresources');
});

// Set the app to listen on port 3000
// The express app acts as middleware for the native https server
// HTTPS!
var https_server = https.createServer(credentials, app);
https_server.listen(PORT, function(req, res) {

});
