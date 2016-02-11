/* Color Sheme Switcher. This script is used only for showcase purpose */
jQuery(document).ready(function() { 
    if(jQuery.cookie("css_mazzareli")) {
        jQuery("link#tl_themecolor-sheme-css").attr("href",jQuery.cookie("css_mazzareli"));
        
    }
    jQuery("#nav li a").click(function() {              
        jQuery("link#tl_themecolor-sheme-css").attr("href",jQuery(this).attr('rel'));
        jQuery.cookie("css_mazzareli",jQuery(this).attr('rel'), {expires: 365, path: '/'});
        return false;
    });
    
});