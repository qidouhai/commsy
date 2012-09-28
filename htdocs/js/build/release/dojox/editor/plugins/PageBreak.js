//>>built
define("dojox/editor/plugins/PageBreak","dojo,dijit,dojox,dijit/_editor/_Plugin,dijit/form/Button,dojo/_base/connect,dojo/_base/declare,dojo/i18n,dojo/i18n!dojox/editor/plugins/nls/PageBreak".split(","),function(b,e,f,g){b.declare("dojox.editor.plugins.PageBreak",g,{useDefaultCommand:!1,iconClassPrefix:"dijitAdditionalEditorIcon",_unbreakableNodes:["li","ul","ol"],_pbContent:"<hr style='page-break-after: always;' class='dijitEditorPageBreak'>",_initButton:function(){var a=this.editor,d=b.i18n.getLocalization("dojox.editor.plugins",
"PageBreak");this.button=new e.form.Button({label:d.pageBreak,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"PageBreak",tabIndex:"-1",onClick:b.hitch(this,"_insertPageBreak")});a.onLoadDeferred.addCallback(b.hitch(this,function(){a.addKeyHandler(b.keys.ENTER,!0,!0,b.hitch(this,this._insertPageBreak));(b.isWebKit||b.isOpera)&&this.connect(this.editor,"onKeyDown",b.hitch(this,function(a){a.keyCode===b.keys.ENTER&&a.ctrlKey&&a.shiftKey&&this._insertPageBreak()}))}))},updateState:function(){this.button.set("disabled",
this.get("disabled"))},setEditor:function(a){this.editor=a;this._initButton()},_style:function(){if(!this._styled){this._styled=!0;var a=this.editor.document;if(b.isIE)a.createStyleSheet("").cssText=".dijitEditorPageBreak {\n\tborder-top-style: solid;\n\tborder-top-width: 3px;\n\tborder-top-color: #585858;\n\tborder-bottom-style: solid;\n\tborder-bottom-width: 1px;\n\tborder-bottom-color: #585858;\n\tborder-left-style: solid;\n\tborder-left-width: 1px;\n\tborder-left-color: #585858;\n\tborder-right-style: solid;\n\tborder-right-width: 1px;\n\tborder-right-color: #585858;\n\tcolor: #A4A4A4;\n\tbackground-color: #A4A4A4;\n\theight: 10px;\n\tpage-break-after: always;\n\tpadding: 0px 0px 0px 0px;\n}\n\n@media print {\n\t.dijitEditorPageBreak { page-break-after: always; background-color: rgba(0,0,0,0); color: rgba(0,0,0,0); border: 0px none rgba(0,0,0,0); display: hidden; width: 0px; height: 0px;}\n}";
else{var d=a.createElement("style");d.appendChild(a.createTextNode(".dijitEditorPageBreak {\n\tborder-top-style: solid;\n\tborder-top-width: 3px;\n\tborder-top-color: #585858;\n\tborder-bottom-style: solid;\n\tborder-bottom-width: 1px;\n\tborder-bottom-color: #585858;\n\tborder-left-style: solid;\n\tborder-left-width: 1px;\n\tborder-left-color: #585858;\n\tborder-right-style: solid;\n\tborder-right-width: 1px;\n\tborder-right-color: #585858;\n\tcolor: #A4A4A4;\n\tbackground-color: #A4A4A4;\n\theight: 10px;\n\tpage-break-after: always;\n\tpadding: 0px 0px 0px 0px;\n}\n\n@media print {\n\t.dijitEditorPageBreak { page-break-after: always; background-color: rgba(0,0,0,0); color: rgba(0,0,0,0); border: 0px none rgba(0,0,0,0); display: hidden; width: 0px; height: 0px;}\n}"));
a.getElementsByTagName("head")[0].appendChild(d)}}},_insertPageBreak:function(){try{this._styled||this._style(),this._allowBreak()&&this.editor.execCommand("inserthtml",this._pbContent)}catch(a){console.warn(a)}},_allowBreak:function(){for(var a=this.editor,b=a.document,c=a._sCall("getSelectedElement",[])||a._sCall("getParentElement",[]);c&&c!==b.body&&c!==b.html;){if(a._sCall("isTag",[c,this._unbreakableNodes]))return!1;c=c.parentNode}return!0}});b.subscribe(e._scopeName+".Editor.getPlugin",null,
function(a){if(!a.plugin&&"pagebreak"===a.args.name.toLowerCase())a.plugin=new f.editor.plugins.PageBreak({})});return f.editor.plugins.PageBreak});