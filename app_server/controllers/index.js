var validate = require('../static/js/validate_agent')

module.exports.index = function (req, res) {
    // We need to check the session here and see if the user is already authenticated
    // verify the webid!
    validate.verify_agent(req, function (result) {
        if (result) {
            res.render('index', {title: 'BioNode'})
        } else {
            res.redirect('/unauthed')
        }
    })
}
