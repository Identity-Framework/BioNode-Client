exports.GET = GET
exports.POST = POST

var webid = require('webid')('tls')
var forge = require('node-forge')
var asn1 = forge.asn1
var pki = forge.pki

function GET(req, res, next) {
    // render the signup page
    res.render('signup', {title: 'BioNode: WebID signup'})    
}

function POST(req, res, next) {
    var options = {
        spkac: req.body.spkac,
        agent: "https://esterline.ncat.edu/corysabol"
    }
    webid.generate(options, function(err, cert) {
        console.log(cert)
        if (err === null) {
            var der = asn1.toDer(pki.certificateToAsn1(cert)).getBytes()
            res.set('Content-Type', 'application/x-x509-user-cert')
            res.send(Buffer.from(der, 'binary'))
        } else {
            console.log(err)
            res.send(err)
        }
    })
}

