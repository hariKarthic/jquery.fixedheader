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

        console.log(this.element);
		this.clonerow(this.options.rows)


    };

    FixedHeader.prototype.clonerow = function(rowcount){

    	var cloneRows = $(this.element).find('tr');
    	console.log(cloneRows);
    	var actualClones = cloneRows.filter(function(index){
    		return parseInt(index+1) <= parseInt(rowcount,10)
		});
    	console.log($(actualClones));
    	$(this.element).prepend(actualClones)
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
