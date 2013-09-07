"use strict";

/* Directives */

(function(module) {

	module.directive("appVersion", [ "version", function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	} ]);

})(angular.module("esxiApp.directives", []));
