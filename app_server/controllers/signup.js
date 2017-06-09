var webid = require('webid')('tls')
var forge = require('node-forge')
var asn1 = forge.asn1
var pki = forge.pki

module.exports.signup = function (req, res, next) {
    // logic to provide a user with a web id and simple profile.
    // can evetually stuff profiles in a db or some such store.

    // render the signup page
    if (req.method === 'GET') {
        res.render('signup', {title: 'BioNode: WebID signup'})    
    }
    if (req.method === 'POST') {
        console.log(typeof(req.body.spkac))
        var options = {
            //<keygen name=spkack>
            spkac: Buffer.from(Array(req.body.spkac)),
            agent: req.body.name 
        }
        webid.generate(options, function(err, cert) {
            // cert is undefined for some reason...
            console.log(cert)
            // we get an error here with the cert being undefined...
            // forge can't get the tbsCertificate
            var der = asn1.toDer(pki.certificateToAsn1(cert)).getBytes()
            res.set('Content-Type', 'application/x-x509-user-cert')
            res.send(Buffer.from(der, 'binary'))
        })
    }
}


