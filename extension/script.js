/*globals _, chrome, jQuery */
jQuery(function () {
	'use strict';

	var enabled = true,

		sets = {
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
		},

		iconSelector = {
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
		},

		extraStyles = {
			// chat: 'background-position: -21px 0px !important;',
			// calendar: 'background-position: -42px 0px;',
			// image: 'background-position: -84px -84px !important;'
		},

		port = chrome.extension.connect();

	function addStyles(options) {
		var iconName = null,
			imgSrc = null,
			cssStyle = null,
			selector = null,
			i = null,
			styleContent = [];

		_.each(iconSelector, function (selectors, iconName) {
			var imgSelectors = [],
				x = -21 * (i % 5),
				y = -21 * Math.floor(i / 5);

			if (selectors.length > 0) {
				imgSrc = chrome.extension.getURL('images/sprites/' + options.iconSet + '.png');
				cssStyle = 'background: no-repeat url(' + imgSrc + ') ' + x + 'px ' + y + 'px !important;';

				if (sets[options.iconSet] === undefined || sets[options.iconSet].indexOf(iconName) !== -1) {
					selector = selectors.join(",\n");
					styleContent.push(selector + ' {' + cssStyle + '}');
					if (extraStyles[iconName] !== undefined) {
						styleContent.push(selector + ' {' + extraStyles[iconName] + '}');
					}
				}

				styleContent.push(imgSelectors.join(",\n") + ' {' + cssStyle + '}');
			}

			i++;
		});

		jQuery('head').append(jQuery('<style type="text/css">' + styleContent.join("\n") + '</style>'));
	}

	port.onMessage.addListener(function (msg) {
		if (msg.oninit) {
			if (enabled === true) {
				addStyles(msg.options);
			}
		}
	});
	port.postMessage({
		init : true
	});
});
