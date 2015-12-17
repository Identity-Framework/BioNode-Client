var ldnode = require('ldnode');

var ldp = ldnode.createServer({
    key: '/keys/server.key',
    cert: '/keys/server.crt',
    webid: true
});

ldp.listen(3000, function() {
  // Started Linked Data Platform
});
