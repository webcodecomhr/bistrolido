/* Book a table staff */
jQuery(document).ready(function(){
    jQuery("#datepicker").datetimepicker({showOn: "button",
                                          buttonImageOnly: true,
                                          buttonImage: settings.themeurl+"/js/jquery-ui-1.8.2.datepicker/smoothness/images/calendar.gif"});
    
    jQuery("#send-book-button").click(function(e){
        var form = jQuery(this).parents("form");
        form = form[0];
        var formData = jQuery(form).serializeJSON();
        
        /* Strip any shown errors */
        jQuery(".page-template-template-page-book-table-php .contact-modal-box").html("").hide('fast');

        var jsonData = {'action':'mls_ajax_handler',
                'subaction' : 'book',
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
                    jQuery(".page-template-template-page-book-table-php .contact-modal-box").html(response.data.msg).show('slow');
                }else{ 
                    /* Remove previous messages */
                    jQuery(form).find("p > span").remove();
                    jQuery.each(response.data, function(field_name, msg){
                        jQuery(form).find("input[name='"+field_name+"'], textarea[name='"+field_name+"']").after("<span></span>");
                        jQuery(form).find("input[name='"+field_name+"'], textarea[name='"+field_name+"']").next().html("&nbsp;"+msg);
                    }); 
                }
            },
            error: function(response){
                jQuery(".page-template-template-page-book-table-php .contact-modal-box").html("Unable to send request.").show('slow');
            }            
        });
        e.preventDefault(); 
    });
    
    /* Reset book a table form */
    jQuery("#cancel-book-button").click(function(e){
        form = jQuery(this).parents("form");
        jQuery(form).find("p > span").remove();
        jQuery(form).reset();
        jQuery(".page-template-template-page-book-table-php .contact-modal-box").html("").hide('fast');
        e.preventDefault();
    });
});