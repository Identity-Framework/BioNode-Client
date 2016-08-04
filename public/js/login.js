// This file needs to make use of the solid-client lib
var solid = require("solid-client");

// Login
var login = function() {
  // Get the current user
  solid.login().then(function (webId){
    // authentication succeeded; do something with the WebID string
    console.log(webId)
  }).catch(function (err) {
    // authentication failed; display some error message
    console.log(err)
  })
}
