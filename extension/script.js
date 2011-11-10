/*jslint  */
/*globals chrome, jQuery */
jQuery(function () {
	var icon_name = null;

	var icon_selector = {
		attach: ['.yE', '.gW'],
		chat: ['.J-KU .srbnEd', '.o3.tk3N6e-I-J3'],
		calendar: ['.kYKy4c', '.lb87sf'],
		call: ['.l0q2Kd'],
		buzz: [],

		cog: ['.ykKkhb'],
		prev: ['.SOLoEf', '.iHkD0e'],
		next: ['.P1rG1b', '.A65iE'],
		refresh: ['.cSQWXc'],
		archive: ['.oqtkzd'],

		back: ['.G8oNDd'],
		tag: ['.J0wwu'],
		spam: ['.hjiQh'],
		thrash: ['.HSe1Vd'],
		file: ['.SwbPNe'],

		reply: ['.hB', '.mL'],
		replyall: ['.mK'],
		forward: ['.mI', '.gC'],
		newwindow: ['.gZ', '.eI'],
		print: ['.g1'],

		expand: ['.gx'],
		collapse: ['.gq'],
		down: [],
		mail: ['.uEX2Af'],
		image: ['.KbtMj']
	};

	var extra_styles = {
		chat: 'background-position: -21px 0px !important;',
		calendar: 'background-position: -42px 0px;',
		image: 'background-position: -84px -84px !important;'
	};

	var style_content = [];
	var selector = null,
		img_selectors = [];

	for (icon_name in icon_selector) {
		if (icon_selector.hasOwnProperty(icon_name)) {
			if (icon_selector[icon_name].length > 0) {
				selector = icon_selector[icon_name].join(",\n");
				img_selectors.push(selector);

				if (extra_styles[icon_name] !== undefined) {
					style_content.push(selector + ' {' + extra_styles[icon_name] + '}');
				}
			}
		}
	}

	var img_src = chrome.extension.getURL('sprite.png');
	var css_style = 'background-image: url(' + img_src + ') !important;';
	style_content.push(img_selectors.join(",\n") + ' {' + css_style + '}');
	jQuery('#canvas_frame').contents().find('head').append(jQuery('<style type="text/css">' + style_content.join("\n") + '</style>'));
});