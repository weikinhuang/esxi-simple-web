"use strict";

/* Services */

(function(module) {

	module.value("version", "0.1");

	module.value("hostname", document.location.host);

	module.factory("esxApi", function($http) {
		function parseXml(xml) {
			var dom = null;
			if (window.DOMParser) {
				try {
					dom = (new DOMParser()).parseFromString(xml, "text/xml");
				} catch (e) {
					dom = null;
				}
			} else if (window.ActiveXObject) {
				try {
					dom = new ActiveXObject('Microsoft.XMLDOM');
					dom.async = false;
					if (!dom.loadXML(xml)) {
						// parse error ..
						window.alert(dom.parseError.reason + dom.parseError.srcText);
					}
				} catch (e) {
					dom = null;
				}
			} else {
				alert("cannot parse xml string!");
			}
			return dom;
		}

		var xmlExtract = /<xml.*?>\s?\s?([\s\S]+)\s?<\/xml>/;

		function transformResponse(data) {
			var xmlData = (xmlExtract.exec(data) || [])[1];
			if (!xmlData) {
				return {};
			}
			var jsonObj = {};
			try {
				var jsonStr = xml2json(parseXml(xmlData)).replace(/{\sundefined/, "{");
				jsonObj = JSON.parse(jsonStr);
				console.log(jsonObj);
				return jsonObj;
			} catch (e) {
				console.log(e.message);
				return {};
			}
		}

		return {
			get : function(params) {
				return $http({
					url : "/mob/?" + $.param(params || {}),
					method : "get",
					transformResponse : transformResponse
				});
			},
			post : function(params, data) {
				return $http({
					url : "/mob/?" + $.param(params || {}),
					method : "post",
					data : data || {},
					transformResponse : transformResponse
				});
			}
		};
	});

})(angular.module("esxiApp.services", []));
