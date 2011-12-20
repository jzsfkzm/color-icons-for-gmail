function initOptions() {
	// check option stored
	var default_options = {
		iconset: 'keves_black'
	};
	var	options = localStorage.options ? JSON.parse(localStorage.options) : default_options;
	if (options.iconset === undefined) {
		options.iconset = default_options.iconset;
	}

	function markSelected() {
		// select the selected one
		jQuery('.demo.selected').removeClass('selected');
		jQuery('.demo.hovered').removeClass('hovered');
		jQuery('#' + options.iconset).closest('.demo').addClass('selected');
	}
	markSelected();

	// make hover working
	jQuery('.demo').hover(
		function () {
			if (!jQuery(this).hasClass('selected')) {
				jQuery(this).addClass('hovered');
			}
		},
		function () {
			jQuery(this).removeClass('hovered');
		}
	);

	// make click working
	jQuery('.demo').bind('click', function (e) {
		options.iconset = e.target.id;
		localStorage.options = JSON.stringify(options);
		console.log(window.localStorage);
		markSelected();
	});

	// show the whole thing
	document.getElementById('main').style.display = 'block';
}
