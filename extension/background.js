/*jslint browser:true */
/*globals chrome, localStorage */
var default_options = {
	iconset: 'keve_black'
};

chrome.extension.onConnect.addListener(function (port) {
	port.onMessage.addListener(function (msg) {
		if (msg.init) {
			port.postMessage({
				oninit : true,
				options : localStorage.options ? JSON.parse(localStorage.options) : default_options
			});
		}
	});
});

