// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

jQuery(document).ready(function()
{	
	// INITIALIZE DROPDOWN MENU
    jQuery('.dd-menu li:has(ul) > a').addClass('dd-submenu-title').append('<span class="dd-arrow"></span>');	
    jQuery('.dd-menu li ul').prepend('<li class="arrow"></li>');	
    jQuery('.dd-menu li').hover(function(){	
                    			    // HOVER IN HANDLER
                                    jQuery('ul:first', this).css({visibility: "visible",display: "none"}).slideDown(250);									
                            			var path_set = jQuery(this).parents('.dd-menu li').find('a:first');
                            			jQuery(path_set).addClass('dd-path');						
                            			jQuery('.dd-menu li a.dd-path').not(path_set).removeClass('dd-path');
                            			
                            		},function(){			
                            			// HOVER OUT HANDLER
                            		    jQuery('ul:first', this).css({visibility: "hidden"});		 	
	});

    jQuery("a.lightbox-standard").fancybox({
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'overlayShow'       : true,
		'showCloseButton'   : false,
	    'titlePosition'     : 'inside', 
	    'opacity'          : true,
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<div id="tip7-title"><span class="fancy-close-btn"><a href="" onclick="jQuery.fancybox.close();">˟</a></span>' + ((title && title.length>0 ) ? '<b>' + title + '</b>' : ' ')+'</div>';
		}
	});	

		
	//ZOOM effect FancyBox	
	jQuery("a[rel=fancy_zoom], a.lightbox").fancybox({
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'overlayShow'       : true,
		'showCloseButton'   : false, 
	    'titlePosition'     : 'inside',
	    'opacity'          : true,
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
			return '<div id="tip7-title"><span class="fancy-close-btn"><a href="" onclick="jQuery.fancybox.close();">˟</a></span>' + (title && title.length>0 ? '<b>' + title + '</b>' : '' ) + (jQuery(currentArray[currentIndex]).data("desc") !='' ? '<p>'+jQuery(currentArray[currentIndex]).data("desc")+'</p>' : '')+'</div>';
		}
	});	
	
	/* ----------------- Ajax for Contact form in footer and contact page ------------------ */
	jQuery.fn.serializeJSON=function() {
                        var jsonxxx = {}; //json
                        jQuery.map(jQuery(this).serializeArray(), function(n, i){
                            jsonxxx[n['name']] = n['value'];
                        });
                        return jsonxxx;
    }; 
    jQuery.fn.reset = function () {
        jQuery(this).each (function() { this.reset(); }); 
    };
			
	jQuery(".contact-button").click(function(e){
	    var form = jQuery(this).parents("form");
	    form = form[0];
	    var formData = jQuery(form).serializeJSON();
	    //Request sent from a contact Widget
	    var isWidget = (jQuery(form).find("input[name='from_widget']").val() == 1);
	    if(isWidget){
	        jQuery(".widget .contact-modal-box").hide("fast");
	    }else{
	        jQuery(".contact-page .contact-modal-box").hide("fast");
	    }
	    var jsonData = {'action':'mls_ajax_handler',
	                    'subaction' : 'contact',
                        'tl_theme_ajax_nonce':tl_themeAjax.ajax_nonce,
                        'form_data': formData};
    	   	    
	    jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            url: tl_themeAjax.ajaxurl,
            data: jsonData,
            success: function(response){
                if(response.status == 'success'){
                    jQuery(form).reset();  
                }else{ 
                        if(isWidget){
                            jQuery(form).parent().find(".contact-modal-box").html(response.data.msg).show('slow');
                        }else{
                            /* Remove previous messages */
                            jQuery.each(response.data, function(field_name, msg){
                                jQuery(form).parent().find("input[name='"+field_name+"'], textarea[name='"+field_name+"']").next().html('');//after("<span></span>");
                                jQuery(form).parent().find("input[name='"+field_name+"'], textarea[name='"+field_name+"']").next().html("&nbsp;"+msg);
                            }); 
                        }
                }
                if(isWidget){
                    jQuery(form).parent().find(".contact-modal-box").html(response.data.msg).show('slow');
                }else{      
                    jQuery(".contact-page .contact-modal-box").html(response.data.msg).show('slow');
                }    
            },
            error: function(response){
                if(isWidget){
                    jQuery(form).find(".contact-modal-box").html(response.data.msg).show('slow');
                }else{
                    jQuery(".contact-page .contact-modal-box").html(response.data.msg).show('slow');
                }
            }            
      });
	  e.preventDefault();
	}); // End submit btn
	
	/* Reset button for contact form */
	jQuery("#reset-comment").click(function(e){
	    var form = jQuery(this).parents("form");
	    jQuery(form).reset();
	    jQuery(".widget .contact-modal-box, .contact-page .contact-modal-box").html("").hide('fast');
	    e.preventDefault();
	});
	
	/* Comments staff from HERE */
	jQuery("#send-comment").click(function(e){
	    jQuery("#commentform").submit();
	});
	
	/*Menu with sliding buttons */
	var mouseY = 0;
	jQuery(".menu-container").mousemove(function(e){
	      mouseY = e.pageY - jQuery(this).offset().top - 100; 
	});
	
	if(typeof jQuery.fn.bxSlider != 'undefined'){
	    var menu_slider = jQuery(".menu-slider-inner").bxSlider({
            infiniteLoop: false,
            controls: false,
            pager: false,
            speed: 1500,
            useCSS: false,
            easing: 'easeInOutExpo',
            onSliderLoad:function(){
            	var followers = jQuery(".prev-page, .next-page");
			    var yp = 0;
			    menu_container_height = jQuery(".menu-slider").height();
			    var loop = setInterval(function(){

			       if(mouseY < 90){
			       		mouseY = 90;
			       }else if(mouseY > menu_container_height - 210){
			       		mouseY = menu_container_height - 210;
			       }
			        step = (mouseY - yp) / 12;
			        yp += step;
			        if(Math.abs(step) > .5){
			            followers.css('top',yp);
			        }
			        }, 30);
            }
          });

          jQuery(".menu-container .next-page").click(function(){
                menu_slider.goToNextSlide();
                return false;
          });
         jQuery(".menu-container .prev-page").click(function(){
            menu_slider.goToPrevSlide();
            return false;
         });
	}	
}); //END Document Ready