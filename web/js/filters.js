"use strict";

/* Filters */
(function(module) {

	module.filter("interpolate", [ "version", function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	} ]);

	module.filter("interpolate", [ "version", function(version) {
		return function(text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	} ]);

	var hasOwn = Object.prototype.hasOwnProperty;
	module.filter('toArray', function() {
		return function(o) {
			if (o === null || typeof o !== "object" || o.length) {
				return o;
			}
			var k = [], i;
			for (i in o) {
				if (hasOwn.call(o, i)) {
					k[k.length] = o[i];
				}
			}
			return k;
		};
	});

})(angular.module("esxiApp.filters", []));
