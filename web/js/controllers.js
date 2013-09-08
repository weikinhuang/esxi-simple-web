"use strict";

/* Controllers */
(function(module) {
	module.controller("HomeController", ["$scope", "esxApi", function($scope, esxApi) {
		var apiResponse = esxApi.get({
			moid : "ha-host"
		});
		$scope.hostData = apiResponse;
		$scope.hostname = "Loading...";
		apiResponse.success(function(){
			$scope.hostname = "hi";
		});
		apiResponse.success(function(data){
			console.log(data.html);
		});
	}]);

	module.controller("VmListController", ["$scope", "esxApi", function($scope, esxApi) {
		var apiResponse = esxApi.get({
			moid : "ha-folder-vm"
		});
		var vms = {};
		$scope.totalVms = "Loading...";
		$scope.vmList = vms;

		apiResponse.success(function(data){
			$scope.totalVms = data.childEntity.ManagedObjectReference.length;
		});

		apiResponse.success(function(data){
			var vmArray = data.childEntity.ManagedObjectReference;
			var totalVms = vmArray.length;
			for (var i = 0; i < totalVms; i++) {
				vms[vmArray[i]["#text"]] = {
					id : vmArray[i]["#text"],
					info : esxApi.get({
						moid : vmArray[i]["#text"]
					}).success(function(data){console.log(data);}),
					runtime : esxApi.get({
						moid : vmArray[i]["#text"],
						doPath : "runtime"
					}).success(function(data){console.log(data);}),
					quickStats : esxApi.get({
						moid : vmArray[i]["#text"],
						doPath : "summary.quickStats"
					}).success(function(data){console.log(data);}),
				};
			};
			console.log(data);
		});
	}]);

	module.controller("NavigationController", function($scope, $location) {
		$scope.hostname = $location.host();
		$scope.navItems = {
			"/" : "Home",
			"/vm" : "Virtual Machines"
		};
	});

})(angular.module("esxiApp.controllers", []));
