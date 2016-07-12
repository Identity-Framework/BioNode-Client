module.exports = biometrics;
var $rdf = require('rdflib');
function BiometricsUtility(thresh){
	this.threshold = thresh | -1;
	this.taxicab = function(ar1, ar2){
		var norm = 0, max;
		if(this.threshold == -1){
			throw(new Error("This cannot be performed"));
		}
		for(let i in ar1){
			norm+=Math.abs(ar2[i]-ar1[i]);
			max+=Math.max(ar1[i], ar2[i]);
		}
		return norm/max;
	};
	this.euclidian = function (ar1, ar2){
		var norm = 0, max;
		if(this.threshold == -1){
			throw(new Error("This cannot be performed"));
		}
		for(let i in ar1){
			norm += Math.pow(ar2[i]-ar1[i], 2);
			max+=Math.pow(Math.max(ar1[i], ar2[i]), 2);
		}
		return Math.sqrt(norm)/ Math.sqrt(max);
	};
}

