"use strict";

(function() {

	var depends = [ "ngRoute", "ngAnimate", "esxiApp.filters", "esxiApp.services", "esxiApp.directives", "esxiApp.controllers" ];
	// Declare app level module which depends on filters, and services
	var app = angular.module("esxiApp", depends);
	app.config([ "$routeProvider", function($routeProvider) {
		$routeProvider.when("/", {
			templateUrl : "partials/home.html",
			controller : "HomeController"
		});

		$routeProvider.when("/view1", {
			templateUrl : "partials/partial1.html",
			controller : "MyCtrl1"
		});

		$routeProvider.when("/view2", {
			templateUrl : "partials/partial2.html",
			controller : "MyCtrl2"
		});

		$routeProvider.otherwise({
			redirectTo : "/"
		});
	} ]);

})();
