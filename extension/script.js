/*jslint browser:true */
/*globals chrome, jQuery */
jQuery(function () {
	var enabled = true;

	var sets = {
		keves_black: [
		    'cog',
			'prev',
			'next',
			'archive',
			'tag',
			'spam',
			'thrash',
			'file',
			'reply',
			'replyall'
		]
        // keves_white: [],
        // silk: []
	};

	var icon_selector = {
		attach: ['.yE', '.gW'],
		chat: ['.J-KU .aj2', '.o3.T-I-J3', '.xM'],
		calendar: ['.anp', '.an1'],
		call: ['.ana'],
		buzz: [],

		cog: ['.aos'],
		prev: ['.adj', '.amI'],
		next: ['.adk', '.amJ'],
		refresh: ['.asf'],
		archive: ['.ar8'],

		back: ['.ar6'],
		tag: ['.asb'],
		spam: ['.asl'],
		thrash: ['.ar9'],
		file: ['.ase'],

		reply: ['.hB', '.mL'],
		replyall: ['.mK'],
		forward: ['.mI', '.gC'],
		newwindow: ['.gZ', '.eI'],
		print: ['.g1'],

		expand: ['.gx'],
		collapse: ['.gq'],
		down: [],
		mail: ['.ank'],
		image: ['.aeu']
	};

	var extra_styles = {
		chat: 'background-position: -21px 0px !important;',
		calendar: 'background-position: -42px 0px;',
		image: 'background-position: -84px -84px !important;'
	};

	var style_content = [];
	var selector = null,
		img_selectors = [];

	function addStyles(options) {
	    var icon_name = null;

		for (icon_name in icon_selector) {
			if (icon_selector.hasOwnProperty(icon_name)) {
				if (icon_selector[icon_name].length > 0) {
                    if (sets[options.iconset] === undefined || sets[options.iconset].indexOf(icon_name) !== -1) {
                        selector = icon_selector[icon_name].join(",\n");
                        img_selectors.push(selector);

                        if (extra_styles[icon_name] !== undefined) {
							style_content.push(selector + ' {' + extra_styles[icon_name] + '}');
						}
				    }
				}
			}
		}

		var img_src = chrome.extension.getURL('sprite_' + options.iconset + '.png');
		var css_style = 'background-image: url(' + img_src + ') !important;';
		style_content.push(img_selectors.join(",\n") + ' {' + css_style + '}');
		jQuery('head').append(jQuery('<style type="text/css">' + style_content.join("\n") + '</style>'));
	}

	var port = chrome.extension.connect();
	port.onMessage.addListener(function (msg) {
		if (msg.oninit) {
			// console.log(msg.options);
			if (enabled === true) {
				addStyles(msg.options);
			}
		}
	});
	port.postMessage({
		init : true
	});
});
