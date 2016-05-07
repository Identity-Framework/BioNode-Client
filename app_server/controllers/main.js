var validate = require('../static/js/validate_agent');

module.exports.index = function (req, res) {
    // verify the webid!
    validate.verify_agent(req, function () {
        res.render('index', {title: 'BioNode'});
    });
};
