//>>built
require({cache:{"url:commsy/widgets/templates/ErrorDialog.html":'<div class="${baseClass} dijitDialog" role="dialog" aria-labelledby="${id}_title">\n\t<div data-dojo-attach-point="titleBar" class="dijitDialogTitleBar">\n\t\t<span data-dojo-attach-point="titleNode" class="dijitDialogTitle" id="${id}_title"></span>\n\t\t<span data-dojo-attach-point="closeButtonNode" class="dijitDialogCloseIcon" data-dojo-attach-event="ondijitclick: onCancel" title="${buttonCancel}" role="button" tabIndex="-1">\n\t\t\t<span data-dojo-attach-point="closeText" class="closeText" title="${buttonCancel}">x</span>\n\t\t</span>\n\t</div>\n\t\n\t<div data-dojo-attach-point="containerNode" class="dijitDialogPaneContent">\n\t\t<img src="templates/themes/default/img/error5.png">\n\t\t<div class="CommSyErrorDescription">${!translations.ajaxErrorDescription}</div>\n\t\t<div class="clear"></div>\n\t\t\n\t\t<div class="CommSyErrorMarginText">${!translations.ajaxErrorAutoClose}(<span data-dojo-attach-point="secRemainingNode"></span>)</div>\n\t</div>\n</div>'}});
define("commsy/widgets/ErrorDialog","dojo/_base/declare,dijit/Dialog,commsy/base,dijit/_TemplatedMixin,dojo/_base/lang,dojo/dom-construct,dojo/dom-attr,dojo/on,dojo/query,dojox/timing,dojo/text!./templates/ErrorDialog.html,dojo/i18n!./nls/common".split(","),function(b,c,d,e,f,j,k,l,m,g,h,i){return b([d,c,e],{baseClass:"CommSyErrorWidget",widgetHandler:null,secRemaining:5,title:"Error",templateString:h,constructor:function(a){a=a||{};b.safeMixin(this,a);this.timer=new g.Timer(1E3)},postMixInProperties:function(){this.inherited(arguments);
this.translations=i},postCreate:function(){this.inherited(arguments);this.secRemainingNode.innerHTML=this.secRemaining;this.timer.onTick=f.hitch(this,function(a){this.onTick(a)});this.timer.start()},onTick:function(){1===this.secRemaining?(this.timer.stop(),this.destroyRecursive(!1)):(this.secRemaining--,this.secRemainingNode.innerHTML=this.secRemaining)}})});