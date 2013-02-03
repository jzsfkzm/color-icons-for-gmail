/*jslint browser:true */
/*globals chrome, localStorage */
(function () {
	"use strict";

	var defaultOptions = {
			iconSet: 'keves_black'
		},

		possibleIconsets = [
			'keves_black',
			'keves_white',
			'silk'
		];

	chrome.extension.onConnect.addListener(function (port) {
		port.onMessage.addListener(function (msg) {
			var options = localStorage.options ? JSON.parse(localStorage.options) : defaultOptions;
			if (possibleIconsets.indexOf(options.iconSet) === -1) {
				options.iconSet = defaultOptions.iconSet;
			}

			if (msg.init) {
				port.postMessage({
					oninit: true,
					options: options
				});
			}
		});
	});
}());
