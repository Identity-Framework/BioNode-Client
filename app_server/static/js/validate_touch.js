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
var validate;

function dataCollected(x) {
	var validate = setInterval(dataCollected, 10000); //validate every 10 seconds
	
	close("")//close window
}
	

	function dataCollectStop() {
		clearInterval (dataCollect);
	}	
window.stop ();

}

<<<<<<< HEAD
module.exports.validate = validate.
=======
module.exports.validate = validate.
>>>>>>> origin/validate-touch-data
