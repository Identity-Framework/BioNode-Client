
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
var biometric = require('./lib/biometric');
var validate = require('./lib/validate');

// These need to be relative
var KEY_PATH = 'keys/key.pem';
var CERT_PATH = 'keys/cert.pem';
var ROOT_PATH = '/ldresources';
var HTTPS_PORT = 5000;

var PRIVATE_KEY = fs.readFileSync(KEY_PATH);
var CERT = fs.readFileSync(CERT_PATH);

// credentials/options for the https server
var credentials = {
    requestCert: true,
    rejectUnauthorized: false,
    key: PRIVATE_KEY,
    cert: CERT
};

// Create the express app
var app = express();

// Use the session middleware
app.use(session({
    secret: 'linkeddata',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialize: false
}));

// Do the app routing here
app.get('/', function (req, res, next) {
    res.send('<a href="/validate">Validate WebID</a>')
});

app.get('/validate', function (req, res, next) {
    var cert = req.connection.getPeerCertificate();

    if (!cert) {
        res.send('No cert provided!');
    };

    // validate the WebID CERT
    webid.verify(cert, function (err, result) {
        if (err) {
            // handle the error
            console.log('Error processing certificate: ' + err.message);
            res.send('Error processing certificate:\n' + err.message);
        }
        console.log('Webid verification result: ' + result);
        // Store the verification result in the session
        req.session.user_webid = result;
        req.session.verified = true;
        res.send('WebID successfully validated');
    });
});

app.get(ROOT_PATH, function (req, res) {
    console.log('GET request /ldresources');
    res.send('GET request /ldresources');
});

// Create a regular HTTP server
// var http_server = http.createServer(app)
//     .listen(HTTP_PORT, function (req, res) {
//     });

// Set the app to listen on port 3000
// The express app acts as middleware for the native https server
// HTTPS!
var https_server = https.createServer(credentials, app)
    .listen(HTTPS_PORT, function (req, res) {});

// var https_server2 = https.createServer({
//     key: PRIVATE_KEY,
//     cert: CERT
// }, app).listen(3000, function (req, res) {});
