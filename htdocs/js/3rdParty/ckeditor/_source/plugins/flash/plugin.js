//>>built
define("ckeditor/_source/plugins/flash/plugin",["dijit","dojo","dojox"],function(){(function(){function e(a){a=a.attributes;return"application/x-shockwave-flash"==a.type||g.test(a.src||"")}function f(a,d){return a.createFakeParserElement(d,"cke_flash","flash",!0)}var g=/\.swf(?:$|\?)/i;CKEDITOR.plugins.add("flash",{init:function(a){a.addCommand("flash",new CKEDITOR.dialogCommand("flash"));a.ui.addButton("Flash",{label:a.lang.common.flash,command:"flash"});CKEDITOR.dialog.add("flash",this.path+"dialogs/flash.js");
a.addCss("img.cke_flash{background-image: url("+CKEDITOR.getUrl(this.path+"images/placeholder.png")+");background-position: center center;background-repeat: no-repeat;border: 1px solid #a9a9a9;width: 80px;height: 80px;}");a.addMenuItems&&a.addMenuItems({flash:{label:a.lang.flash.properties,command:"flash",group:"flash"}});a.on("doubleclick",function(a){var b=a.data.element;if(b.is("img")&&"flash"==b.data("cke-real-element-type"))a.data.dialog="flash"});a.contextMenu&&a.contextMenu.addListener(function(a){if(a&&
a.is("img")&&!a.isReadOnly()&&"flash"==a.data("cke-real-element-type"))return{flash:CKEDITOR.TRISTATE_OFF}})},afterInit:function(a){var d=a.dataProcessor;(d=d&&d.dataFilter)&&d.addRules({elements:{"cke:object":function(b){var c=b.attributes;if((!c.classid||!(""+c.classid).toLowerCase())&&!e(b)){for(c=0;c<b.children.length;c++)if("cke:embed"==b.children[c].name){if(!e(b.children[c]))break;return f(a,b)}return null}return f(a,b)},"cke:embed":function(b){return!e(b)?null:f(a,b)}}},5)},requires:["fakeobjects"]})})();
CKEDITOR.tools.extend(CKEDITOR.config,{flashEmbedTagOnly:!1,flashAddEmbedTag:!0,flashConvertOnEdit:!1})});