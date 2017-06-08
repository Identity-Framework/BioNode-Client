var validate = require('../static/js/validate_agent')

module.exports.index = function (req, res) {
    // We need to check the session here and see if the user is already authenticated
    // verify the webid!
    // The main reason that this logic is here is because we can only ask for a cert
    // as soon as the user connects to the service, this is because of the implementation of 
    // TLS and clientside certs...
    // A way around this would be to have a separate service on another port which can requset and 
    // validate the web id.
    validate.verify_agent(req, function (result) {
        if (result) {
            res.render('index', {title: 'BioNode'})
        } else {
            res.redirect('/signup')
        }
    })
}
