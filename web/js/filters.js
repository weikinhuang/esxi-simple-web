"use strict";

/* Filters */
(function(module) {

	var hasOwn = Object.prototype.hasOwnProperty;
	module.filter("toArray", function() {
		return function(o) {
			if (o === null || typeof o !== "object" || o.length) {
				return o;
			}
			var k = [], i;
			for (i in o) {
				if (hasOwn.call(o, i)) {
					k[k.length] = o[i];
				}
			}
			return k;
		};
	});

	module.filter("timeWords", function() {
		var pattern = /\$/g, f = {
			s : "less than a minute",
			i : "about a minute",
			ii : "$ minutes",
			h : "about an hour",
			hh : "about $ hours",
			d : "a day",
			dd : "$ days",
			m : "about a month",
			mm : "$ months",
			y : "about a year",
			yy : "$ years"
		};

		return function(distance) {
			if (!distance) {
				return distance;
			}
			distance = parseInt(distance, 10) * 1000;
			var s = Math.abs(distance) / 1000, m = s / 60, h = m / 60, d = h / 24, y = d / 365;

			return s < 45 && f.s.replace(pattern, s) || s < 90 && f.i.replace(pattern, 1) || m < 45 && f.ii.replace(pattern, Math.round(m)) || m < 90 && f.h.replace(pattern, 1) || h < 24 && f.hh.replace(pattern, Math.round(h)) || h < 48
					&& f.d.replace(pattern, 1) || d < 30 && f.dd.replace(pattern, Math.floor(d)) || d < 60 && f.m.replace(pattern, 1) || d < 365 && f.mm.replace(pattern, Math.floor(d / 30)) || y < 2 && f.y.replace(pattern, 1)
					|| f.yy.replace(pattern, Math.floor(y));
		};
	});

	module.filter("capitalize", function() {
		return function(str) {
			if (!str) {
				return str;
			}
			return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
		};
	});

	module.filter("ucwords", function() {
		return function(str) {
			if (!str) {
				return str;
			}
			return str.replace(/\b[a-z]/g, function(match) {
				return match.toUpperCase();
			});
		};
	});

	module.filter("roundMemory", function() {
		return function(memory, divisor) {
			if (!memory) {
				return memory;
			}
			return (parseInt(memory, 10) / Math.pow(1024, divisor || 0)).toFixed(0);
		};
	});

	module.filter("roundSpace", function() {
		return function(memory, decimal) {
			if (!memory) {
				return memory;
			}
			var i = 0, b = parseInt(memory, 10);
			while ((b / 1024) > 1) {
				b /= 1024;
				i++;
			}
			return b.toFixed(decimal === 0 || decimal ? decimal : 2) + " " + [ "B", "KB", "MB", "GB", "TB" ][i];
		};
	});

	module.filter("camelcaseToSpace", function() {
		return function(str) {
			if (!str) {
				return str;
			}
			return str.split(/(?=[A-Z])/).join(" ").toLowerCase();
		};
	});

})(angular.module("esxiApp.filters", []));
