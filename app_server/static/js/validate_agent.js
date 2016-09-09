var session = require('express-session');
var webid = require('webid/tls');

/*Expects a express, request and response objects
takes an optional callback method. Callback takes no args.

Validates a given webid and modifies the session to reflect authentication.
Stores boolean value 'authed' - was the webid validated?
Stores string value 'agent' - the webid of the agent

@author Cory Sabol - cssabol@uncg.edu
*/
var verify_agent = function(req, callback) {
    callback = callback || null;

    // Verify the WebID
    var sess = req.session;

    console.log(req.session);
    // Set the cert in the session
    // This is secure as long as the session values aren't set into a cookie.
    sess.cert = req.connection.getPeerCertificate();

    // Really should generate a token on verification
    sess.authed = false;

    // Validate the WebID
    webid.verify(sess.cert, function (err, result) {
        if (err || sess.cert == {}) {
            // Set session value
            sess.authed = false;
        } else {
            // The webid was valid
            sess.authed = true;
        }

        console.log(result);
        console.log(sess.authed);
        sess.agent = result;
        req.session = sess;

        if (callback != null) {
            // execute the callback
            callback(result);
        }
    });
};

module.exports.verify_agent = verify_agent;
