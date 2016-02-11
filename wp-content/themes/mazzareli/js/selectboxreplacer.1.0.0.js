/**
 *  Select box beautifier
 */
(function( $ ) {
	 $.fn.selecBoxRepalacer.methods = {
		    init : function( options ) { 
		      // Do your awesome plugin stuff here
			    return this.each(function() {

			    }); 
		    },
		    show : function( ) {
		      // IS
		    },
		    hide : function( ) { 
		      // GOOD
		    },
		    update : function( content ) { 
		      // !!! 
		    }
    };


  $.fn.selecBoxRepalacer = function(options) {
  	 // Create some defaults, extending them with any options that were provided
    var settings = $.extend({},	options);
   // Method calling logic
    if ( $.fn.selecBoxRepalacer.methods[method] ) {
      	return $.fn.selecBoxRepalacer.methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      	return $.fn.selecBoxRepalacer.methods.init.apply( this, arguments );
    } else {
      	$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  };
})( jQuery );