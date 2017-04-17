/* Validates given Biometric Data, specifically Touch Data and modifies the session based on the authentication outcome. 

Verify WebID first?

This proccess is continuous and is back end. 


validate expects biometric data in the form
of a js object such as {mouse: mousedata
					touch: touchdate
					keyboard:key}
						
It returns a js object with boolean values as 
follows {mouse: true, touch: false}

@ author Alaysia Murphy- almurphy@baypath.edu
*/
var key = true; 

var touch = false; //[Active authentication standard];


var validate = setInterval(dataCollected, 10000); //validate every 10 seconds

function dataCollected(x) {
	
  if (touch == true ) {
	  alert(1); //Do set of actions
  } else if (touch == false) {
	  alert(2); // Do another set of actions
	} 
	
	if (key == true) {
	  alert(3); // Do set of actions specified in first if
	
  } else if (key == false) {
	  alert(4); // Do second set of actions
  }

    if (window.prompt("stop"))
		 clearInterval(validate);
}
	
<<<<<<< HEAD
module.exports.validate = validate.
=======
module.exports.validate = validate.
>>>>>>> origin/validate-touch-data
