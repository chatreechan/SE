!function(e){"use strict";e.JRepeatable=function(t,n){var a=this;return a&&a!==window?(a.$input=e(t),a.$input.data("JRepeatable")?a:(a.$input.data("JRepeatable",a),a.init=function(){a.options=e.extend({},e.JRepeatable.defaults,n),a.$container=e(a.options.container),e("body").append(a.$container),a.$rowsContainer=a.$container.find(a.options.repeatableElement).parent(),a.prepareModal(),a.inputs=[],a.values={},a.prepareTemplate();var t=a.$input.val();if(t)try{a.values=JSON.parse(t)}catch(e){if(e instanceof SyntaxError)try{t=t.replace(/'/g,'"').replace(/\\"/g,"'"),a.values=JSON.parse(t)}catch(e){window.console&&console.log(e)}else window.console&&console.log(e)}a.buildRows(),e(document).on("click",a.options.btModalOpen,function(e){e.preventDefault(),a.$modalWindow.modal("show")}),a.$modalWindow.on("click",a.options.btModalClose,function(e){e.preventDefault(),a.$modalWindow.modal("hide"),a.buildRows()}),a.$modalWindow.on("click",a.options.btModalSaveData,function(e){e.preventDefault(),a.$modalWindow.modal("hide"),a.refreshValue()}),a.$container.on("click",a.options.btAdd,function(t){t.preventDefault();var n=e(this).parents(a.options.repeatableElement);n.length||(n=null),a.addRow(n)}),a.$container.on("click",a.options.btRemove,function(t){t.preventDefault();var n=e(this).parents(a.options.repeatableElement);a.removeRow(n)}),a.$input.trigger("weready")},a.prepareTemplate=function(){var t=a.$container.find(a.options.repeatableElement),n=e(t.get(0));try{a.clearScripts(n)}catch(e){window.console&&console.log(e)}for(var o=n.find("*[name]"),i=0,r=o.length;i<r;i++){var l=e(o[i]).attr("name");a.values[l]||(a.inputs.push({name:l,type:e(o[i]).attr("type")||o[i].tagName.toLowerCase()}),a.values[l]=[])}a.template=n.prop("outerHTML"),t.remove(),a.$input.trigger("prepare-template",a.template)},a.prepareModal=function(){var t=e(a.options.modalElement);t.css({position:"absolute",width:"auto","max-width":"100%"}),t.on("shown",function(){a.resizeModal()}),e(window).resize(function(){a.resizeModal()}),a.$modalWindow=t.modal({show:!1,backdrop:"static"}),a.$input.trigger("prepare-modal",a.$modalWindow)},a.resizeModal=function(){if(a.$modalWindow.is(":visible")){var t=e(document).width()/2,n=a.$modalWindow.width()/2,o=a.$rowsContainer.width()/2,i=n>=t?0:-n,r=i?"50%":0,l=e(document).scrollTop()+.2*e(window).height();a.$modalWindow.css({top:l,left:r,"margin-left":i,overflow:o>n?"auto":"visible"})}},a.buildRows=function(){var e=a.$rowsContainer.children();e.length&&a.removeRow(e);for(var t=a.values[Object.keys(a.values)[0]].length||1,n=null,o=0;o<t;o++)n=a.addRow(n,o)},a.addRow=function(t,n){var o=a.$container.find(a.options.repeatableElement).length;if(o>=a.options.maximum)return null;var i=e.parseHTML(a.template);t?e(t).after(i):a.$rowsContainer.append(i);var r=e(i);if(a.fixUniqueAttributes(r,o+1),null!==n&&void 0!==n)for(var l=0,d=a.inputs.length;l<d;l++){var s=a.inputs[l].name,c=a.inputs[l].type,p=null;if(a.values[s]&&(p=a.values[s][n]),null!==p&&void 0!==p)if("radio"===c)r.find('*[name*="'+s+'"][value="'+p+'"]').attr("checked","checked");else if("checkbox"===c)if(p.length)for(var u=0,f=p.length;u<f;u++)r.find('*[name*="'+s+'"][value="'+p[u]+'"]').attr("checked","checked");else r.find('*[name*="'+s+'"][value="'+p+'"]').attr("checked","checked");else r.find('*[name*="'+s+'"]').val(p)}try{a.fixScripts(r)}catch(e){window.console&&console.log(e)}return a.$input.trigger("row-add",r),r},a.removeRow=function(t){a.$input.trigger("row-remove",t),e(t).remove()},a.fixUniqueAttributes=function(e,t){var n=e.find("*[id]");a.increaseAttrName(n,"id",t);var o=e.find("label[for]");a.increaseAttrName(o,"for",t);var i=e.find("*[name]");a.increaseAttrName(i,"name",t)},a.increaseAttrName=function(t,n,a){for(var o=0,i=t.length;o<i;o++){var r=e(t[o]),l=r.attr(n);r.attr(n,a+"-"+l)}},a.refreshValue=function(){var t=a.$container.find(a.options.repeatableElement);a.values={};for(var n=0,o=a.inputs.length;n<o;n++){var i=a.inputs[n].name,r=a.inputs[n].type;a.values[i]=[];for(var l=0,d=t.length;l<d;l++){var s=e(t[l]),c=null;if("radio"===r)c=s.find('*[name*="'+i+'"]:checked').val();else if("checkbox"===r){var p=s.find('*[name*="'+i+'"]:checked');if(p.length>1){c=[];for(var u=0,f=p.length;u<f;u++)c.push(e(p[u]).val())}else c=p.val()}else c=s.find('*[name*="'+i+'"]').val();c=null===c?"":c,a.values[i].push(c)}}a.$input.val(JSON.stringify(a.values)),a.$input.trigger("value-update",a.values)},a.clearScripts=function(t){e.fn.chosen&&t.find("select").each(function(){e(this).data("chosen")&&e(this).chosen("destroy")}),e.fn.minicolors&&t.find(".minicolors input").each(function(){e(this).minicolors("destroy",e(this))})},a.fixScripts=function(t){t.find(".minicolors").each(function(){var t=e(this);t.minicolors({control:t.attr("data-control")||"hue",position:t.attr("data-position")||"right",theme:"bootstrap"})}),t.find('a[onclick*="jInsertFieldValue"]').each(function(){var t=e(this),n=t.siblings('input[type="text"]').attr("id"),a=t.prev(),o=a.attr("href");t.attr("onclick","jInsertFieldValue('', '"+n+"');return false;"),a.attr("href",o.replace(/&fieldid=(.+)&/,"&fieldid="+n+"&")),jMediaRefreshPreview(n)}),t.find(".field-media-wrapper").each(function(){e(this).fieldMedia()}),window.SqueezeBox&&window.SqueezeBox.assign&&SqueezeBox.assign(t.find("a.modal").get(),{parse:"rel"})},void a.init())):new e.JRepeatable(t,n)},e.JRepeatable.defaults={modalElement:"#modal-container",btModalOpen:"#open-modal",btModalClose:".close-modal",btModalSaveData:".save-modal-data",btAdd:"a.add",btRemove:"a.remove",maximum:10,repeatableElement:"table tbody tr"},e.fn.JRepeatable=function(t){return this.each(function(){var t=t||{},n=e(this).data();for(var a in n)n.hasOwnProperty(a)&&(t[a]=n[a]);new e.JRepeatable(this,t)})},e(window).on("load",function(){e("input.form-field-repeatable").JRepeatable()})}(jQuery);