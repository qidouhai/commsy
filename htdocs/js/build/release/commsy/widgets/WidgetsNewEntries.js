//>>built
define("commsy/widgets/WidgetsNewEntries","dojo/_base/declare,dijit/_WidgetBase,commsy/base,dijit/_TemplatedMixin,dojo/_base/lang,dojo/dom-construct,dojo/dom-attr,dojo/query,dojo/on".split(","),function(f,h,i,j,g,a){return f([i,h,j],{baseClass:"CommSyWidget",widgetHandler:null,itemId:null,currentPage:1,maxPage:1,entriesPerPage:10,items:[],constructor:function(a){a=a||{};f.safeMixin(this,a)},postCreate:function(){this.inherited(arguments);this.itemId=this.from_php.ownRoom.id;this.updateList()},updateList:function(){a.empty(this.itemListNode);
this.AJAXRequest("widget_new_entries","getListContent",{start:(this.currentPage-1)*this.entriesPerPage,numEntries:this.entriesPerPage},g.hitch(this,function(e){dojo.forEach(e.items,g.hitch(this,function(c,e){var d=a.create("div",{className:0==e%2?"row_even even_sep_search":"row_odd odd_sep_search"},this.itemListNode,"last"),b=a.create("div",{className:"column_280"},d,"last"),b=a.create("p",{},b,"last");a.create("a",{id:"listItem"+c.itemId,className:"stack_link",href:"commsy.php?cid="+c.contextId+
"&mod="+c.module+"&fct=detail&iid="+c.itemId,innerHTML:c.title},b,"last");b=a.create("div",{className:"column_45"},d,"last");b=a.create("p",{},b,"last");0<c.fileCount&&a.create("a",{className:"attachment",href:"#",innerHTML:c.fileCount},b,"last");b=a.create("div",{className:"column_65"},d,"last");b=a.create("p",{},b,"last");a.create("img",{src:this.from_php.template.tpl_path+"img/netnavigation/"+c.image.img,title:c.image.text},b,"last");b=a.create("div",{className:"column_90"},d,"last");a.create("p",
{innerHTML:c.modificationDate},b,"last");b=a.create("div",{className:"column_155"},d,"last");a.create("p",{innerHTML:c.creator},b,"last");a.create("div",{className:"clear"},d,"last")}));this.maxPage=Math.ceil(e.total/this.entriesPerPage);this.currentPageNode.innerHTML=Math.min(this.currentPage,this.maxPage);this.maxPageNode.innerHTML=this.maxPage}))},onClickListEntry:function(a){a=this.getAttrAsObject(a,"data-custom");this.reload(a.iid,a.module,a.cid)},onClickPagingFirst:function(){if(1<this.currentPage)this.currentPage=
1;this.updateList()},onClickPagingPrev:function(){1<this.currentPage&&this.currentPage--;this.updateList()},onClickPagingNext:function(){this.currentPage<this.maxPage&&this.currentPage++;this.updateList()},onClickPagingLast:function(){if(this.currentPage<this.maxPage)this.currentPage=this.maxPage;this.updateList()}})});