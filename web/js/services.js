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

		var xmlExtract = /<xml.*?>\s?([\s\S]+?)\s?<\/xml>/;
		var htmlExtract = /<body.*?>\s?([\s\S]+?)\s?<\/body>/;

		function transformResponse(data) {
			var xmlData = (xmlExtract.exec(data) || [])[1];
			var defaultResponse = {
				html : $("<div>")
			};
			if (!xmlData) {
				return defaultResponse;
			}
			var htmlData = ((htmlExtract.exec(data) || [])[1] || "").replace(/(?:<xml[\s\S]+<\/xml>)/, "").replace(/(?:<script[\s\S]+<\/script>)/, "");
			try {
				var jsonStr = xml2json(parseXml(xmlData)).replace(/{\sundefined/, "{");
				var jsonObj = JSON.parse(jsonStr) || {};
				var returnObj = jsonObj.object || jsonObj;
				returnObj.html = $("<div>").html(htmlData);
				return returnObj;
			} catch (e) {
				console.log(e.message);
				return defaultResponse;
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
