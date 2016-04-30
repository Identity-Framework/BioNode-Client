var express = require('express');
var session = require('express-session');
var router = express.Router();
var webid = require('webid/tls');

/* GET home page. */
router.get('/', function(req, res, next) {
    // Verify the WebID
    var sess = req.session;
    var redirect_uri = '';

    console.log(req.session);
    // Set the cert in the session
    // Is this secure? Need to look into that.
    sess.cert = req.connection.getPeerCertificate();

    // Really should generate a token on verification
    // Is it secure just to have a boolean value?
    sess.authed = false;

    // Validate the WebID
    webid.verify(sess.cert, function (err, result) {
        if (err || sess.cert == {}) {
            redirect_uri = '/unauthed';
            // Set session value
            sess.authed = false;
        } else {
            redirect_uri = '';
            sess.authed = true;
        }

        console.log(result);
        sess.authed = true;
        console.log(sess.authed);
        req.session = sess;
        res.redirect(redirect_uri);
    });


    res.render('index', { title: 'BioNode' });
});

module.exports = router;
