/* Sliders File */
function isOn($p){
   return $p == 'on' ? true : false;
}
jQuery(document).ready(function(){
    doMainSlider = function(){
        if(tl_themeSliders.slider.slider_type == 'anything_slider'){
            /*Set Nav arrows*/
            tl_themeSliders.slider.onInitialized = function(e, slider) {
                jQuery("#prev, #next").click(function(){
                    if (jQuery(this).is('#prev')) {
                        slider.goBack();
                    } else {
                        slider.goForward();
                    }
                });
            }
            
            /*Convert strings to integers */
            tl_themeSliders.slider.autoPlay           = isOn(tl_themeSliders.slider.autoPlay);
            tl_themeSliders.slider.autoPlayLocked     = isOn(tl_themeSliders.slider.autoPlayLocked);
            tl_themeSliders.slider.delay              = parseInt(tl_themeSliders.slider.delay);
            tl_themeSliders.slider.delayBeforeAnimate = parseInt(tl_themeSliders.slider.delayBeforeAnimate);
            tl_themeSliders.slider.animationTime      = parseInt(tl_themeSliders.slider.animationTime);
            tl_themeSliders.slider.showMultiple       = parseInt(tl_themeSliders.slider.showMultiple);
            tl_themeSliders.slider.pauseOnHover       = isOn(tl_themeSliders.slider.pauseOnHover);
            tl_themeSliders.slider.playRtl            = isOn(tl_themeSliders.slider.playRtl);
            tl_themeSliders.slider.stopAtEnd          = isOn(tl_themeSliders.slider.stopAtEnd);
            tl_themeSliders.slider.resumeDelay        = parseInt(tl_themeSliders.slider.resumeDelay);
            tl_themeSliders.slider.allowRapidChange   = isOn(tl_themeSliders.slider.allowRapidChange);
            tl_themeSliders.slider.buildArrows        = isOn(tl_themeSliders.slider.buildArrows);
            tl_themeSliders.slider.toggleArrows       = isOn(tl_themeSliders.slider.toggleArrows);
            tl_themeSliders.slider.buildNavigation    = isOn(tl_themeSliders.slider.buildNavigation);
            tl_themeSliders.slider.buildStartStop     = isOn(tl_themeSliders.slider.buildStartStop);
            tl_themeSliders.slider.autoPlayDelayed    = isOn(tl_themeSliders.slider.autoPlayDelayed);
            
            tl_themeSliders.slider.resumeOnVisible   = false;
            tl_themeSliders.slider.resizeContents    = true;
            
            tl_themeSliders.slider.onInitialized = function(){
                jQuery("#slider").hide("fast", function(){
                    jQuery(this).css("visibility", "visible");
                    jQuery(this).fadeIn("slow");            
                });
            }
            
            if(tl_themeSliders.slider.theme == 'Default'){ // Slider with Mask (default one)
                jQuery("#sliderul").anythingSlider(tl_themeSliders.slider).anythingSliderFx({ 
                        '.small-slider h4'  : [ 'caption-Top', '10px', '2000', 'swing' ], 
                        '.small-slider h2'  : [ 'caption-Left', '100px', '1900', 'swing' ], 
                        '.small-slider p'   : [ 'left', '300px', '1500', 'easeOutExpo'], 
                        '.small-slider a'   : [ 'left', '250px', '2000','easeOutElastic' ]  
                    }); 
            }else{
                /* Standard or full slider */
                tl_themeSliders.slider.expand = true;
                sl = jQuery("#sliderul").anythingSlider(tl_themeSliders.slider);
                key = '.'+tl_themeSliders.slider.slide_extraposition;

                if(tl_themeSliders.slider.theme == 'Full'){
                    sl.anythingSliderFx({ 
                    key : [ tl_themeSliders.slider.slide_extraposition, '350px', '700', 'easeOutExpo' ],
                    '.caption-Top'    : [ 'caption-Top-Standard', '350px', '1000', 'swing' ],
                    '.caption-Left'   : [ 'caption-Left-Full', '350px', '1000', 'swing' ],
                    '.caption-Right'  : [ 'caption-Right-Full', '350px', '1000', 'swing' ],
                    '.caption-Bottom' : [ 'caption-Bottom-Standard', '350px', '1000', 'swing' ]
                   });
                }else{
                    sl.anythingSliderFx({ 
                    key : [ tl_themeSliders.slider.slide_extraposition, '350px', '700', 'easeOutExpo' ],
                    '.caption-Top'    : [ 'caption-Top-Standard', '350px', '1000', 'swing' ],
                    '.caption-Left'   : [ 'caption-Left-Standard', '350px', '1000', 'swing' ],
                    '.caption-Right'  : [ 'caption-Right-Standard', '350px', '1000', 'swing' ],
                    '.caption-Bottom' : [ 'caption-Bottom-Standard', '350px', '1000', 'swing' ]
                   });
                }
            }
        }
    }
    
    doCarousel = function(){
        /*idea */
        selector = arguments[0];
        opts     = arguments[1];
        
        jQuery("#menu-slider ul").anythingSlider({
            buildNavigation:false,
            buildStartStop: false,
            buildArrows:false,
            mode: 'horizontal',
            theme:'carousel',
            delay: 3000,
            expand: true,
            hashTags: false,
            showMultiple: tl_themeSliders.carousel.items_per_row, 
            easing: 'easeInOutExpo',
            animationTime: 1000,
            changeBy: tl_themeSliders.carousel.featured_section_changeby,
            onBeforeInitialize  : function(e, slider) {
            },
            onInitialized: function(e, slider) {
                meta_height = jQuery("#menu-slider ul li:first-child > div > div p.meta").outerHeight(true);
                title = jQuery("#menu-slider ul li:first-child > div > div h3").outerHeight(true);
                arrows_top =  60 + meta_height + title + jQuery("#menu-slider ul li:first-child > div > div p.image img").innerHeight()/2;
                var maxSlideHeight = 0;
                jQuery("#menu-slider ul li > div > div").each(function(index){
                    if(jQuery(this).outerHeight(true) > maxSlideHeight)
                    {
                        maxSlideHeight = jQuery(this).outerHeight(true);
                    }
                });
                
                jQuery("#menu-slider").height(maxSlideHeight);
                jQuery("#menu-slider .prev-menu-slider, #menu-slider .next-menu-slider").css('top', arrows_top);
                jQuery("#menu-slider .prev-menu-slider, #menu-slider .next-menu-slider").click(function(){
                    if (jQuery(this).is('.prev-menu-slider')) {
                        slider.goBack();
                    } else {
                        slider.goForward();
                    }
                });
                /* Animate carousel */
                jQuery("#menu-slider").hide(10, function(){
                    jQuery(this).css("visibility", "visible");
                    jQuery(this).fadeIn("slow");            
                });     
            }
        });
    }//do carousel
    jQuery("#slider").waitForImages(doMainSlider, function(){}, true);
    jQuery("#menu-slider").waitForImages(doCarousel, function(){}, true);
}); // jQuery