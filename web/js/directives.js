"use strict";

/* Directives */

(function(module) {

	module.directive("appVersion", [ "version", function(version) {
		return function(scope, elm, attrs) {
			elm.text(version);
		};
	} ]);

	module.directive("preventDefault", function() {
		return function(scope, element, attrs) {
			$(element).on("click", function(event) {
				event.preventDefault();
			});
		};
	});

})(angular.module("esxiApp.directives", []));
