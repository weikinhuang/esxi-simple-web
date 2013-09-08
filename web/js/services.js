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
			var htmlData = ((htmlExtract.exec(data) || [])[1] || "").replace(/(?:<xml[\s\S]+<\/xml>)/, "").replace(/(?:<script[\s\S]+<\/script>)/, "");
			var xmlData = (xmlExtract.exec(data) || [])[1];
			var returnObj = {};
			if (xmlData) {
				try {
					var jsonStr = xml2json(parseXml(xmlData)).replace(/{\sundefined/, "{");
					var jsonObj = JSON.parse(jsonStr) || {};
					returnObj = jsonObj.object || jsonObj;
				} catch (e) {
					console.log(e.message);
				}
			}
			returnObj.html = $("<div>").html(htmlData);
			return returnObj;
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
					method : "get"
				}).then(function(resp) {
					data = data || {};
					var nonce = transformResponse(resp.data).html.find(":input[name='vmware-session-nonce']").val();
					if (nonce) {
						data["vmware-session-nonce"] = nonce;
					}
					if (!nonce) {
						return;
					}
					return $http({
						url : "/mob/?" + $.param(params || {}),
						method : "post",
						data : $.param(data),
						headers : {
							'Content-Type' : 'application/x-www-form-urlencoded'
						}
					}).then(function(postResp) {
						return transformResponse(resp.data);
					});
				});
			}
		};
	});

})(angular.module("esxiApp.services", []));
