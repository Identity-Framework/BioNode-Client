
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
var reasoner_serv = require('./gen_node');

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
    var cert = req.connection.getPeerCertificate();
    var sess = req.session;
    sess.authed = false;

    // validate the WebID CERT
    webid.verify(cert, function (err, result) {
        if (err) {
            // handle the error
            console.log('Error processing certificate: ' + err.message);
            // Security flaw.. Should redirect to access denied page.
            throw err;
        }
        console.log('Webid verification result: ' + result);
        // Store the verification result in the session
        req.session.user_webid = result;
        req.session.authed = true;
        res.redirect('/authorized');
    });
});

app.get('/authorized', function (req, res, next) {

});

app.get('/resources/admin.txt', function (req, res) {

});

// Set the app to listen on port 3000
// The express app acts as middleware for the native https server
// HTTPS!
var https_server = https.createServer(credentials, app)
    .listen(HTTPS_PORT, function (req, res) {});
