"use strict";

/* Filters */
(function(module) {

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
