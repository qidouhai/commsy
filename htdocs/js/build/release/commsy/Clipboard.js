//>>built
define("commsy/Clipboard","dojo/_base/declare,commsy/base,dojo/_base/lang,dojo/query,dojo/on,dojo/dom-construct,dojo/dom-attr,dojo/dom-style,dojo/_base/array,dojo/NodeList-traverse".split(","),function(k,l,a,c,j,b,g,m,h){return k(l,{cid:null,tpl_path:"",initialized:!1,store:{pages:1,selected_ids:[]},init:function(b,d){this.cid=b;this.tpl_path=d;this.performRequest();j(c("input#list_action_submit")[0],"click",a.hitch(this,function(){this.onActionSubmit()}))},performRequest:function(){this.AJAXRequest("clipboard",
"performRequest",{},a.hitch(this,function(i){var d=c("#popup_accounts #crt_row_area")[0];b.empty(d);dojo.forEach(i.list,a.hitch(this,function(f){b.create("h2",{innerHTML:f.headline},d,"last");dojo.forEach(f.items,a.hitch(this,function(e,f){var a=b.create("div",{className:0===f%2?"pop_row_even":"pop_row_odd"},d,"last"),c=b.create("div",{className:"pop_col_25"},a,"last");b.create("input",{type:"checkbox",id:"item_"+e.item_id,checked:-1!==h.indexOf(this.store.selected_ids.indexOf,e.item_id)?!0:!1,disabled:e.disabled},
c,"last");b.create("div",{className:"pop_col_270",innerHTML:e.title},a,"last");c=b.create("div",{className:"pop_col_150"},a,"last");b.create("img",{src:this.tpl_path+"img/netnavigation/"+e.rubric.img,alt:e.rubric.text},c,"last");b.create("div",{className:"pop_col_270",innerHTML:e.modifier},a,"last");b.create("div",{className:"pop_col_150",innerHTML:e.modification_date},a,"last");b.create("div",{className:"clear"},a,"last")}))}));j(c("input[id^='item_']",d),"click",a.hitch(this,function(a){var a=g.get(a.target,
"id").substr(5),b=h.indexOf(this.store.selected_ids,a);-1===b?this.store.selected_ids.push(a):this.store.selected_ids.splice(b,1)}))}))},onActionSubmit:function(){var i=c("#popup_accounts #crt_row_area")[0],d=g.get(c("select#list_action")[0],"value");this.setupLoading();this.AJAXRequest("clipboard","performClipboardAction",{ids:this.store.selected_ids,action:d},a.hitch(this,function(f){if("paste"===d)location.href=f.url;else if("paste_stack"===d)this.destroyLoading();else if("delete"===d){var e=0;
dojo.forEach(c("input[id^='item_']",i),a.hitch(this,function(a){-1!==h.indexOf(this.store.selected_ids,g.get(a,"id").substr(5))?(a=(new dojo.NodeList(a)).parents("div[class^='pop_row_']")[0],b.destroy(a)):e++}));g.set(c("span#tm_clipboard_copies")[0],"innerHTML",e)}}),a.hitch(this,function(a){"error"!==a.status&&console.error("an unhandled error response occurred")}))}})});