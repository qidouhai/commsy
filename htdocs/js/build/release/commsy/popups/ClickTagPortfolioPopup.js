//>>built
define("commsy/popups/ClickTagPortfolioPopup","dojo/_base/declare,commsy/ClickPopupHandler,dojo/query,dojo/dom-class,dojo/_base/lang,dojo/dom-construct,dojo/dom-attr,dojo/dom-style,dojo/on,dojo/topic,dojo/NodeList-traverse".split(","),function(d,e,f,g,a,h,i,j,k,c){return d(e,{constructor:function(){},init:function(b,a){this.triggerNode=b;this.module=a.module;this.tree=null;this.tagId=a.tagId;this.portfolioId=a.portfolioId;this.position=a.position;this.features=[];this.registerPopupClick()},setupSpecific:function(){require(["commsy/PortfolioTree"],
a.hitch(this,function(b){this.tree=new b({followUrl:!1,checkboxes:!1,room_id:this.from_php.ownRoom.id,expanded:!1,item_id:this.item_id,popup:this});this.tree.setupTree(f("div.tree",this.contentNode)[0],a.hitch(this,function(){}))}))},onTagSelected:function(b){this.AJAXRequest("portfolio","updatePortfolioTag",{tagId:b,portfolioId:this.portfolioId,position:this.position,oldTagId:this.tagId},a.hitch(this,function(){c.publish("updatePortfolio",{portfolioId:this.portfolioId});this.close()}))},onPopupSubmit:function(b){"delete"===
b.action&&this.AJAXRequest("portfolio","deletePortfolioTag",{tagId:this.tagId,portfolioId:this.portfolioId},a.hitch(this,function(){c.publish("updatePortfolio",{portfolioId:this.portfolioId});this.close()}))},onPopupSubmitSuccess:function(){}})});