var validate = require('../static/js/validate_agent')

module.exports.index = function (req, res) {
    // verify the webid!
    validate.verify_agent(req, function (result) {
        if (result) {
            res.render('index', {title: 'BioNode'})
        } else {
            res.redirect('/unauthed')
        }
    })
}
