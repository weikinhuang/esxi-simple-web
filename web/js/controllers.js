"use strict";

/* Controllers */
(function(module) {
	module.controller("HomeController", [ "$scope", "esxApi", function($scope, esxApi) {
		var hostInfoResponse = esxApi.get({
			moid : "ha-host"
		});
		$scope.hostData = hostInfoResponse;
		$scope.hostname = "Loading...";
		hostInfoResponse.then(function(data) {
			$scope.hostname = "hi";
			return data;
		});
		hostInfoResponse.then(function(data) {
			console.log(data);
			return data;
		});
	} ]);

	module.controller("VmListController", [ "$scope", "esxApi", function($scope, esxApi) {
		var apiResponse = esxApi.get({
			moid : "ha-folder-vm"
		});
		var vms = {};
		var vmArr = [];
		$scope.totalVms = "Loading...";
		$scope.vmList = vmArr;
		$scope.vmOrder = '-id';

		apiResponse.then(function(data) {
			if (!data.childEntity || !data.childEntity.ManagedObjectReference) {
				$scope.totalVms = "Error!";
			} else {
				$scope.totalVms = data.childEntity.ManagedObjectReference.length;
			}
			return data;
		});

		apiResponse.then(function(data) {
			if (!data.childEntity || !data.childEntity.ManagedObjectReference) {
				return data;
			}
			angular.forEach(data.childEntity.ManagedObjectReference, function(vm) {
				var vmId = vm["#text"];
				var vmData = {
					id : vmId,
					info : esxApi.get({
						moid : vmId
					}).then(function(data) {
						console.log(data);
						return data;
					})
				};
				vms[vmId] = vmData;
				vmArr.push(vmData);
			});
			console.log(data);
			return data;
		});

		$scope.powerOn = function(vm) {
			if (!confirm("Power on virtual machine?")) {
				return;
			}
			esxApi.post({
				moid : vm.id,
				method : "powerOn"
			}).then(function(data) {
				console.log(data);
				return data;
			});
		};
		$scope.powerOff = function(vm) {
			if (!confirm("Power off virtual machine?")) {
				return;
			}
			esxApi.post({
				moid : vm.id,
				method : "powerOff"
			}).then(function(data) {
				console.log(data);
				return data;
			});
		};
		$scope.shutdownGuest = function(vm) {
			if (!confirm("Shutdown virtual machine?")) {
				return;
			}
			esxApi.post({
				moid : vm.id,
				method : "shutdownGuest"
			}).then(function(data) {
				console.log(data);
				return data;
			});
		};
	} ]);

	module.controller("VmController", [ "$scope", "$routeParams", "esxApi", function($scope, $routeParams, esxApi) {
		var vms = {};
		$scope.id = $routeParams.id;

		$scope.info = esxApi.get({
			moid : $routeParams.id
		}).then(function(data) {
			console.log(data);
			return data;
		});

		$scope.powerOn = function(vm) {
			if (!confirm("Power on virtual machine?")) {
				return;
			}
			esxApi.post({
				moid : $routeParams.id,
				method : "powerOn"
			}).then(function(data) {
				console.log(data);
				return data;
			});
		};
		$scope.powerOff = function(vm) {
			if (!confirm("Power off virtual machine?")) {
				return;
			}
			esxApi.post({
				moid : $routeParams.id,
				method : "powerOff"
			}).then(function(data) {
				console.log(data);
				return data;
			});
		};
		$scope.shutdownGuest = function(vm) {
			if (!confirm("Shutdown virtual machine?")) {
				return;
			}
			esxApi.post({
				moid : $routeParams.id,
				method : "shutdownGuest"
			}).then(function(data) {
				console.log(data);
				return data;
			});
		};
	} ]);

	module.controller("NavigationController", function($scope, $location) {
		$scope.hostname = $location.host();
		$scope.navItems = {
			"/" : "Home",
			"/vm" : "Virtual Machines"
		};
	});

})(angular.module("esxiApp.controllers", []));
