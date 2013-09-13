"use strict";

/* Controllers */
(function(module) {
	module.controller("HomeController", [ "$scope", "esxApi", "hostname", "$rootScope", function($scope, esxApi, hostname, $rootScope) {
		var refreshInterval = 30;
		$rootScope.title = "Welcome to " + hostname;

		$scope.cpuPercent = 0;
		$scope.memPercent = 0;

		function getHostData(shouldUpdate) {
			var hostInfoResponse = esxApi.get({
				moid : "ha-host"
			});
			hostInfoResponse.then(function(data) {
				console.log(data);
				var summary = data.summary;
				delete summary.runtime.healthSystemRuntime;
				console.log(JSON.stringify(summary, null, 2));
				$scope.cpuPercent = (data.summary.quickStats.overallCpuUsage / (data.summary.hardware.numCpuCores * data.summary.hardware.cpuMhz)) * 100;
				$scope.memPercent = ((data.summary.quickStats.overallMemoryUsage * (1024 * 1024)) / data.summary.hardware.memorySize) * 100;
				return data;
			});
			if (shouldUpdate) {
				hostInfoResponse.then(function(data) {
					setTimeout(function() {
						getHostData(true).then(function(data) {
							$scope.host = data;
							return data;
						});
					}, refreshInterval * 1000);
					return data;
				});
			}
			return hostInfoResponse;
		}

		$scope.host = getHostData(true);
	} ]);

	module.controller("VmListController", [ "$scope", "esxApi", "hostname", "$rootScope", function($scope, esxApi, hostname, $rootScope) {
		var timer = null;
		var refreshInterval = 30;
		var isRefreshing = false;

		$rootScope.title = "VMs on " + hostname;

		var vms = {};
		$scope.totalVms = "Loading...";
		$scope.vmList = vms;

		function loadVms() {
			$scope.refreshStatus = "Refreshing...";
			isRefreshing = true;

			var apiResponse = esxApi.get({
				moid : "ha-folder-vm"
			});

			apiResponse.then(function(data) {
				if (!data.childEntity || !data.childEntity.ManagedObjectReference) {
					$scope.totalVms = "Error!";
				} else {
					$scope.totalVms = data.childEntity.ManagedObjectReference.length;
				}
				$scope.refreshStatus = "Refresh";
				isRefreshing = false;
				return data;
			});

			apiResponse.then(function(data) {
				if (!data.childEntity || !data.childEntity.ManagedObjectReference) {
					return data;
				}

				var newVms = {};
				angular.forEach(data.childEntity.ManagedObjectReference, function(vm) {
					var vmId = vm["#text"];
					if (vms[vmId]) {
						newVms[vmId] = vms[vmId];
						esxApi.get({
							moid : vmId
						}).then(function(data) {
							newVms[vmId].info = data;
							return data;
						});
					} else {
						var vmData = {
							id : vmId,
							info : esxApi.get({
								moid : vmId
							})
						};
						newVms[vmId] = vmData;
					}
				});
				vms = newVms;
				$scope.vmList = newVms;
				return data;
			});

			// refresh this every X seconds
			apiResponse.then(function(data) {
				timer = setTimeout(function() {
					timer = null;
					loadVms();
				}, refreshInterval * 1000);
				return data;
			});
		}
		loadVms();

		$scope.$on("$destroy", function() {
			if (timer) {
				clearInterval(timer);
			}
		});

		$scope.refresh = function() {
			if (isRefreshing) {
				return;
			}
			loadVms();
		};

		$scope.powerOn = function(vm) {
			if (!vm.info.config || !vm.info.config.name) {
				return;
			}
			if (!confirm("Power on " + vm.info.config.name + "?")) {
				return;
			}
			esxApi.post({
				moid : vm.id,
				method : "powerOn"
			});
		};
		$scope.shutdownGuest = function(vm) {
			if (!vm.info.config || !vm.info.config.name) {
				return;
			}
			if (!confirm("Shutdown " + vm.info.config.name + "?")) {
				return;
			}
			esxApi.post({
				moid : vm.id,
				method : "shutdownGuest"
			});
		};
	} ]);

	module.controller("VmController", [ "$scope", "$routeParams", "esxApi", function($scope, $routeParams, esxApi) {
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
