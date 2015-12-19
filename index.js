
//"https://user1.databox.me/profile/card#me";
//"https://user2.databox.me/profile/card#me";
// "ldnode": "^0.2.14",
// var ldnode = require('ldnode');
var express = require('express');
var session = require('express-session');
var fs = require('fs');
var http = require('http');
var https = require('https');
var webid = require('webid/tls');
var biometric = require('./biometric');

// These need to be relative
var KEY_PATH = 'keys/key.pem';
var CERT_PATH = 'keys/cert.pem';
var ROOT_PATH = '/ldresources';
var PORT = 3000;

var PRIVATE_KEY = fs.readFileSync(KEY_PATH);
var CERT = fs.readFileSync(CERT_PATH);

// credentials/options for the https server
var credentials = {
    requestCert: true,
    key: PRIVATE_KEY,
    cert: CERT
};

// Create the express app
var app = express();

// Use the session middleware
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialize: false
}));

// Do the app routing here
app.get('/', function (req, res) {
    var cert = req.connection.getPeerCertificate();

    if (!cert) {
        res.send('No cert provided!');
    }

    // validate the WebID CERT
    webid.verify(cert, function (err, result) {
        if (err) {
            // handle the error
            console.log('Error processing certificat: ' + err.message);
            res.send()
        }
        // Store some stuff in the session
        console.log('Webid verification result: ' + result);
        // Store the verification result in the session
        req.session.user_webid = result;
        res.send('WebID verified');
    });

    console.log(cert);
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