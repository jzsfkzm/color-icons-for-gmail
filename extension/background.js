/*jslint browser:true */
/*globals chrome, localStorage */
var default_options = {
	iconset: 'keves_black'
};

var possible_iconsets = [
	'keves_black',
	// 'keves_white',
	'silk'
];

chrome.extension.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (msg) {
		var options = localStorage.options ? JSON.parse(localStorage.options) : default_options;
		if (possible_iconsets.indexOf(options.iconset) === -1) {
			options.iconset = default_options.iconset;
		}

		if (msg.init) {
			port.postMessage({
				oninit: true,
				options: options
			});
		}
	});
});

