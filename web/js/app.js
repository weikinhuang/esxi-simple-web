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

})();
