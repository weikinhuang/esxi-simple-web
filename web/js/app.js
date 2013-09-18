"use strict";

(function(window) {

	var depends = [ "ngRoute", "ngAnimate", "esxiApp.filters", "esxiApp.services", "esxiApp.directives", "esxiApp.controllers" ];
	// Declare app level module which depends on filters, and services
	var app = angular.module("esxiApp", depends);
	app.config([ "$routeProvider", function($routeProvider) {
		$routeProvider.when("/", {
			templateUrl : "partials/home.html",
			controller : "HomeController"
		});

		$routeProvider.when("/vm", {
			templateUrl : "partials/vm-list.html",
			controller : "VmListController"
		});
		$routeProvider.when("/vm/:id", {
			templateUrl : "partials/vm.html",
			controller : "VmController"
		});

		$routeProvider.otherwise({
			redirectTo : "/"
		});
	} ]);

	// REPLACING BROKEN IMAGES WITH A 1x1 GIF
	// --------------------------------------------------
	if (window.addEventListener) {
		window.addEventListener("error", function(e) {
			if (e.target.nodeName === "IMG") {
				e.target.src = "data:image/gif;base64," + "R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
			}
		}, true);
	}

})(this);
