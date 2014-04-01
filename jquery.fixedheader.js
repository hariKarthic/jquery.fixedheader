/**
 * jQuery plugin for Fixed Header.
 */
(function($,window,document,undefined){
	//Static members which is available to all instances of widget.
	var arrayHdrOffset = [],
	    arrayHdrBottom = [],
	    fixedHdrWrap = "",
	    fixedTable  = "",
	    tableCount = 0;
	var event = event || window.event;
	$.widget('ui.fixedheader',{
		options:{
			fixedRows: 1 //Option denoting number of rows to be fixed from top.
		},
		_create:function(){
			var that = this,
			    elem = this.element,
				rowIndex = 0,
				parent = this.element.parent(),
			    _elemid = elem.attr("id"),
				_elemname = elem.attr("name");
			fixedHdrWrap =  $("<div class = 'fixedhdr' style='overflow:hidden' ></div>");
			fixedTable  = $("<table class = 'table_style' style='background-color:#ccc'></table>");
			
			var fixedRows = that.options.fixedRows;
			while(fixedRows >= 1){
				rowIndex = fixedRows -1;//To not conflict with eq() as it is a zero based index.
				elem.find('tr:eq('+rowIndex+')').addClass("fixedhdrrow");
				fixedRows--;
			}
			var cloneRows = elem.find("tr.fixedhdrrow");
			/*elem.addClass('givefixedhdr');*/
        	/*	elem.find('tr:eq(0)').addClass("fixedhdrrow");*/
			$(fixedTable).append(cloneRows.clone());
			$(fixedHdrWrap).append(fixedTable);
			this.updatePosition(event, elem);
			this.createFalseHeader(event,elem);
			this._scrollWindow();
			this._bindVerticalScroll(event, parent);
			tableCount++;
		},
		_setOption :function(key,value){
			
		
		
		},
		_scrollWindow : function(event,data){
			$(window).on("scroll",function(){
				_scrollTop = parseInt($(this).scrollTop(),10);
			     for(var i = 0;i<arrayHdrOffset.length;i++){
						if(_scrollTop > arrayHdrOffset[i] && (_scrollTop <= arrayHdrBottom[i])){
							$('._fixedhdr'+i).show();
						}else{
							$('._fixedhdr'+i).hide();
						}		
					}
			});
		},
		_bindVerticalScroll:function(event,data){
			var headerWrap = $(data).find("div.fixedhdr");
			$(data).on('scroll',function(event){
				$(headerWrap).scrollLeft($(this).scrollLeft());});
		},
		updatePosition :function(event,data){
			var fxdHdrOffset = data.offset().top,fxdHdrBottom = fxdHdrOffset + data.height();
			arrayHdrOffset.push(fxdHdrOffset);
			arrayHdrBottom.push(fxdHdrBottom);
		},
		createFalseHeader :  function(event,data){
		/*	$(this).addClass('givefixedhdr');
			$(this).find('tr:first-child').addClass("fixedhdrrow");*/
			$(fixedHdrWrap).addClass('_fixedhdr'+tableCount);
			$(fixedHdrWrap).width( data.parent().width() );
			$(fixedHdrWrap).insertBefore(data);
		},
		//Removing the added classes and performing clean up
		_destroy:function(event){
			$(window).off("scroll");//unbind the window scroll event on destory.
			this.element.find("tr").removeClass("fixedhdrrow");
			$(fixedTable).find("tr.fixedhdrrow").remove();
			arrayHdrOffset.length = 0;
			arrayHdrBottom.length = 0;
			tableCount = 0;
			//$.Widget.prototype.destroy.call( this ); //Uncomment if using jquery v1.8.x
		}
	});
})(jQuery,window,document);