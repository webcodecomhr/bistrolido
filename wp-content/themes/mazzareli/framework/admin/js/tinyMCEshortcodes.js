var ajax_url = ajaxurl; 

/**
 * @todo  Find nice buttons for my BUTTONs
 */
(function() {  
    tinymce.create('tinymce.plugins.shortcodes', {   
        init : function(ed, url) { 
            ed.addButton('mls_mark', {  
                title : 'Mark a Text',  
                
                onclick : function() {  
                    ed.selection.setContent('[mls_mark]' + ed.selection.getContent() + '[/mls_mark]');  
                }  
            });  
            
            ed.addButton('mls_dropcap', {  
                title : 'DropCap',  
                onclick : function() {  
                    ed.selection.setContent('[mls_dropcap]' + ed.selection.getContent() + '[/mls_dropcap]');  
                }  
            });  
            
            ed.addButton('mls_devider', {  
                title : 'Devider',  
                onclick : function() {  
                    ed.selection.setContent('[mls_devider]');  
                }  
            });  
            ed.addButton('mls_blockquote', {  
                title : 'BlockQuote',  
                onclick : function() {  
                    ed.selection.setContent('[mls_blockquote]' + ed.selection.getContent() + '[/mls_blockquote]');  
                }  
            });  
            ed.addButton('mls_quoteleft', {  
                title : 'BlockQuote Left',  
                onclick : function() {  
                    ed.selection.setContent('[mls_quoteleft]' + ed.selection.getContent() + '[/mls_quoteleft]');  
                }  
            });  
            ed.addButton('mls_quoteright', {  
                title : 'BlockQuote Right',  
                onclick : function() {  
                    ed.selection.setContent('[mls_quoteright]' + ed.selection.getContent() + '[/mls_quoteright]');  
                }  
            });  
            
            ed.addButton('mls_yt', {  
                title : 'Youtube Video Clip',  
                onclick : function() {  
                    tb_show('', ajaxurl  + '?action=ajaxShortcode&sc=mls_yt&TB_iframe=true');
                }  
            });
            
            ed.addButton('mls_iframe', {  
                title : 'IFrame',  
                onclick : function() {  
                    tb_show('', ajaxurl  + '?action=ajaxShortcode&sc=mls_iframe&TB_iframe=true');
                }  
            });
            
            ed.addButton('mls_btn', {  
                title : 'Buttons',  
                onclick : function() {  
                    selectedContent = ed.selection.getContent();
                    selectedContent = escape(selectedContent);
                    tb_show('', ajaxurl  + '?action=ajaxShortcode&sc=mls_btn&selectedContent=' + selectedContent + '&TB_iframe=true');
                }  
            });
            
            ed.addButton('mls_gallery', {  
                title : 'Gallery',  
                onclick : function() {  
                    tb_show('', ajaxurl  + '?action=ajaxShortcode&sc=mls_gallery&TB_iframe=true');
                }  
            });
            
            ed.addButton('mls_msg', {  
                title : 'Message Boxes',  
                onclick : function() {  
                    selectedContent = ed.selection.getContent();
                    selectedContent = escape(selectedContent);
                    tb_show('', ajaxurl  + '?action=ajaxShortcode&sc=mls_msg&selectedContent=' + selectedContent + '&TB_iframe=true');
                }  
            });

            ed.addButton('mls_halfx2', {  
                title : 'Layout One Half - One Half',  
                onclick : function() {  
                    ed.selection.setContent('[mls_onehalf first="yes"]First Column[/mls_onehalf]<br />[mls_onehalf]Second Column[/mls_onehalf]');  
                }  
            });

            ed.addButton('mls_thirdx3', {  
                title : 'Layout One Third - One Third - One Third',  
                onclick : function() {  
                    ed.selection.setContent('[mls_onethird first="yes"]First Column[/mls_onethird]<br />[mls_onethird]Second Column[/mls_onethird]<br />[mls_onethird]Third Column[/mls_onethird]');  
                }  
            });

            ed.addButton('mls_onethird_twothird', {  
                title : 'Layout One Third - Two Thirds',  
                onclick : function() {  
                    ed.selection.setContent('[mls_onethird first="yes"]First Column[/mls_onethird]<br />[mls_twothird]Second Column[/mls_twothird]');  
                }  
            });

            ed.addButton('mls_twothird_onethird', {  
                title : 'Layout Two Thirds - One Third',  
                onclick : function() {  
                    ed.selection.setContent('[mls_twothird first="yes"]First Column[/mls_twothird]<br />[mls_onethird]Second Column[/mls_onethird]');
                }  
            });
            
            ed.addButton('mls_oneforth_threeforth', {  
                title : 'Layout One Fourth - Three Fourth',  
                onclick : function() {  
                    ed.selection.setContent('[mls_oneforth first="yes"]First Column[/mls_oneforth]<br />[mls_threeforth]Second Column[/mls_threeforth]');
                }  
            });
            
            ed.addButton('mls_forthx4', {  
                title : 'Layout One Fourth X 4',  
                onclick : function() {  
                    ed.selection.setContent('[mls_oneforth first="yes"]First Column[/mls_oneforth]<br />[mls_oneforth]Second Column[/mls_oneforth]<br />[mls_oneforth]Third Column[/mls_oneforth]<br />[mls_oneforth]Fourth Column[/mls_oneforth]');  
                }  
            });
            
            ed.addButton('mls_363', {  
                title : 'Layout 3 6 3',  
                onclick : function() {  
                    ed.selection.setContent('[mls_oneforth first="yes"]First Column[/mls_oneforth]<br />[mls_onehalf]Second Column[/mls_onehalf]<br />[mls_oneforth]Third Column[/mls_oneforth]');  
                }  
            });
        }, 
       
        createControl : function(n, cm) {  
            
            ed = tinymce.activeEditor;
            
            switch (n){
                case 'mls_gallery' :
                    break;
                case 'mls_headings':
                    var lb = cm.createListBox('mls_headings', {
                        title : 'Headings',
                        onselect : function(v) {
                            if(v != '') {                            
                                ed.execCommand('mceInsertContent', false, '[mls_h'+v+']' + ed.selection.getContent() + '<a id="mls_tmp_mark"></a>[/mls_h'+v+']');
                                //horrible hack to put the cursor in the right spot
                                ed.focus(); //give the editor focus
                                ed.selection.select(ed.dom.select('#mls_tmp_mark')[0]); //select the inserted element
                                ed.selection.collapse(0); //collapses the selection to the end of the range, so the cursor is after the inserted element
                                ed.dom.setAttrib('mls_tmp_mark', 'id', ''); //remove the temp id
                                return false;
                            }
                        }
                   }); 
                    lb.add('H1', '1');
                    lb.add('H2', '2');
                    lb.add('H3', '3');
                    lb.add('H4', '4');
                    lb.add('H5', '5');
                    return lb;
                    break;
            }
        }  
    });  
    //Register plugin
    tinymce.PluginManager.add('shortcodes', tinymce.plugins.shortcodes);
})();  