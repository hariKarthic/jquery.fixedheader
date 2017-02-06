/**
 * A simple light weight pattern.
 *
 */


(function (jq, window) {


	var defaults = {
		rows: '1'
	};


	function FixedHeader(element, options) {

		this.options = $.extend({}, defaults, options);
		this.element = element;
		this.init();

	}

	FixedHeader.prototype.init = function () {

		var cloneRows = this.clonerow(this.options.rows);
		this.addStyles(cloneRows);
		$(this.element).prepend(cloneRows);
		this.bindEvents();


	};

	FixedHeader.prototype.getTableTop = function () {
		var tTop = $("#my_table").top();
	};

	FixedHeader.prototype.bindEvents = function () {


		window.addEventListener('scroll', function (event) {
			console.log(window.scrollY);
		})

	};

	FixedHeader.prototype.addStyles = function (elements) {
		var styles = {
			position: 'absolute',
			top: 0,
			display: 'none'
		};

		elements.css(styles);
	};

	FixedHeader.prototype.clonerow = function (rowcount) {

		var cloneRows = $(this.element).find('tr').filter(function (index) {
			return parseInt(index + 1) <= parseInt(rowcount, 10)
		}).clone();

		return cloneRows;


	};

	/**
	 * Actual plugin is called here
	 */
	jq.fn.extend({

		fixedHeader: function (options) {

			return this.each(function () {
				new FixedHeader(this, options)
			})

		}
	})

})(jQuery, window);
