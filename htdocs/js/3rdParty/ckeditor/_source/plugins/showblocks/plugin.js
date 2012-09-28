//>>built
define("ckeditor/_source/plugins/showblocks/plugin",["dijit","dojo","dojox"],function(){(function(){var c=/%1/g,d=/%2/g,e=/%3/g,f={readOnly:1,preserveState:!0,editorFocus:!1,exec:function(a){this.toggleState();this.refresh(a)},refresh:function(a){if(a.document){var b=this.state==CKEDITOR.TRISTATE_ON?"addClass":"removeClass";a.document.getBody()[b]("cke_show_blocks")}}};CKEDITOR.plugins.add("showblocks",{requires:["wysiwygarea"],init:function(a){var b=a.addCommand("showblocks",f);b.canUndo=!1;a.config.startupOutlineBlocks&&
b.setState(CKEDITOR.TRISTATE_ON);a.addCss(".%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;background-position: top %3;border: 1px dotted gray;padding-top: 8px;padding-%3: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}".replace(c,"background-image: url("+
CKEDITOR.getUrl(this.path)+"images/block_").replace(d,"cke_show_blocks ").replace(e,"rtl"==a.lang.dir?"right":"left"));a.ui.addButton("ShowBlocks",{label:a.lang.showBlocks,command:"showblocks"});a.on("mode",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(a)});a.on("contentDom",function(){b.state!=CKEDITOR.TRISTATE_DISABLED&&b.refresh(a)})}})})()});