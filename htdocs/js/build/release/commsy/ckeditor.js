//>>built
define("commsy/ckeditor","dojo/_base/declare,commsy/base,ckeditor/ckeditor,dojo/dom-attr,dojo/dom-construct,dojo/_base/lang,dojo/on,dojo/query,dojo/NodeList-traverse".split(","),function(e,g,j,b,f,h,i){return e(g,{instance:null,node:null,options:{language:"de",skin:"kama",uiColor:"#eeeeee",startupFocus:!1,dialog_startupFocusTab:!1,resize_enabled:!0,resize_maxWidth:"100%",height:"150px",enterMode:CKEDITOR.ENTER_BR,shiftEnterMode:CKEDITOR.ENTER_P,toolbar:["Cut,Copy,Paste,PasteFromWord,-,Undo,Redo,-,Bold,Italic,Underline,Strike,Subscript,Superscript,SpecialChar,-,NumberedList,BulletedList,Outdent,Indent,Blockquote,-,TextColor,BGColor,-,RemoveFormat,-,Maximize,Preview".split(","),
"/","Format,Font,FontSize,-,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,-,Link,Unlink,-,Table,HorizontalRule,Smiley,-,Image,About".split(",")]},constructor:function(a){a=a||{};e.safeMixin(this,a);this.options.filebrowserUploadUrl="commsy.php?cid="+this.uri_object.cid+"&mod=ajax&fct=ckeditor_image_upload&action=savefile";this.options.filebrowserBrowseUrl="commsy.php?cid="+this.uri_object.cid+"&mod=ajax&fct=ckeditor_image_browse&action=getHTML";this.options.filebrowserWindowWidth="100";this.options.filebrowserWindowHeight=
"50"},create:function(a){this.node=a;var d=b.get(a,"id"),c=f.create("input");b.set(c,"type","hidden");b.set(c,"name","form_data["+d+"]");f.place(c,a,"after");d=a.innerHTML;a.innerHTML="";this.instance=CKEDITOR.appendTo(a,this.options,d);(a=(new dojo.NodeList(a)).parents("form")[0])&&i(a,"submit",h.hitch(this,function(){b.set(c,"value",this.instance.getData())}))},getInstance:function(){return this.instance},getNode:function(){return this.node},destroy:function(){this.instance&&this.instance.destroy()}})});