var express = require('express')
var session = require('express-session')
var router = express.Router()

module.exports.auth = function (req, res, next) {
    // Destroy the session, regen on req back to index
    req.session.destroy(function (err) {
        if (!err) {
            res.render('error_prod',
                    {title : 'unauthenticated',
                     message : 'There was either an error, '
                     + 'or your webid was not valid'})
        } else {
            console.log(err.message);
            res.render('error', {message:err.message})
        }
    }
}
