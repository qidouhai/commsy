//>>built
define("commsy/popups/TogglePortfolio","dojo/_base/declare,commsy/WidgetPopupHandler,dojo/query,dojo/dom-class,dojo/dom-attr,dojo/dom-construct,dojo/on,dojo/parser,dojo/_base/lang".split(","),function(c,d,e,a,f,g,h,i,b){return c(d,{constructor:function(){this.module="portfolio";this.features=[]},onTogglePopup:function(){!0===this.is_open?(a.add(this.popup_button_node,"tm_portfolio_hover"),a.remove(this.contentNode,"hidden")):(a.remove(this.popup_button_node,"tm_portfolio_hover"),a.add(this.contentNode,
"hidden"))},setupSpecific:function(){this.loadWidgetsManual(["widgets/Portfolio"]).then(b.hitch(this,function(a){dojo.forEach(a,b.hitch(this,function(a){a[1].handle.placeAt(e("div.portfolioArea",this.contentNode)[0]);dojo.parser.parse(this.contentNode);a[1].handle.afterParse()}))}))}})});