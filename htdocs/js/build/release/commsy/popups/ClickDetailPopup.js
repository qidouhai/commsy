//>>built
define("commsy/popups/ClickDetailPopup","dojo/_base/declare,commsy/ClickPopupHandler,dojo/query,dojo/dom-class,dojo/_base/lang,dojo/dom-construct,dojo/dom-attr,dojo/on".split(","),function(f,d,b,h,e,i,j,g){return f(d,{constructor:function(){},init:function(b,a){this.triggerNode=b;this.item_id=a.iid;this.module="detail";this.version_id=a.vid||null;this.contextId=a.contextId;a.portfolioId?this.setInitData({portfolioId:a.portfolioId,portfolioRow:a.portfolioRow,portfolioColumn:a.portfolioColumn,fromPortfolio:a.fromPortfolio}):
a.fromPortfolio&&this.setInitData({portfolioId:a.portfolioId,fromPortfolio:a.fromPortfolio});this.ajaxHTMLSource="detail_popup";this.features=[];this.registerPopupClick()},setupSpecific:function(){var d=b("div.item_actions a.edit,div.item_actions a.detail,div.item_actions a.workflow,div.item_actions a.linked,div.item_actions a.annotations,div.item_actions a.versions");require(["commsy/ActionExpander"],function(a){(new a).setup(d)});b(".open_popup",this.contentNode).forEach(e.hitch(this,function(a){g(a,
"click",e.hitch(this,function(){this.close()}));var c=this.getAttrAsObject(a,"data-custom"),b=c.module;c.contextId=this.contextId;this.initData.portfolioId&&f.safeMixin(c,{portfolioId:this.initData.portfolioId,portfolioRow:this.initData.portfolioRow,portfolioColumn:this.initData.portfolioColumn});require(["commsy/popups/Click"+this.ucFirst(b)+"Popup"],function(b){(new b).init(a,c)})}));var a=b("div#discussion_tree")[0];a&&require(["commsy/DiscussionTree"],e.hitch(this,function(b){(new b({item_id:this.item_id})).setupTree(a)}));
require(["commsy/AjaxActions"],function(a){var c=b("a.ajax_action");c&&(new a).setup(c)})},onPopupSubmit:function(){this.submit({tabs:[],nodeLists:[]},{version_id:this.version_id})},onPopupSubmitSuccess:function(){}})});