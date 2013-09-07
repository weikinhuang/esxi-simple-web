"use strict";

/* Controllers */
(function(module) {
	module.controller("HomeController", function($scope, esxApi) {
		$scope.test = esxApi.get({
			moId : "ha-host"
		});
	});

	module.controller("MyCtrl1", function($scope, esxApi) {
		$scope.test = esxApi.get({
			moId : "ha-host"
		});
	});

	module.controller("MyCtrl2", function() {

	});

	module.controller("NavigationController", function($scope, $location) {
		$scope.hostname = $location.host();
		$scope.navItems = {
			"/" : "Home",
			"/view1" : "View 1",
			"/view2" : "View 2"
		};
	});

})(angular.module("esxiApp.controllers", []));
