//>>built
define("commsy/Search","dojo/_base/declare,commsy/base,dojo/_base/lang,dojo/query,dojo/on,dojo/dom-attr".split(","),function(d,g,c,e,f,b){return d(g,{constructor:function(a){a=a||{};d.safeMixin(this,a);this.threshold=3;this.used=!1;this.matches=[];this.ajaxRequests=[]},setup:function(a){f(a,"keyup",c.hitch(this,function(a){this.onKeyUp(a)}));f(a,"click",c.hitch(this,function(a){this.onClick(a)}))},onKeyUp:function(a){b.set(e("input#search_suggestion")[0],"value",a.target.value);a.target.value.length===
this.threshold?(dojo.forEach(this.ajaxRequests,function(a){a.cancel()}),this.ajaxRequests.push(this.AJAXRequest("search","getAutocompleteSuggestions",{search_text:a.target.value.toLowerCase()},c.hitch(this,function(a){this.matches=a;this.autoSuggest(b.get(e("input#search_input")[0],"value"))}),c.hitch(this,function(){}),!1))):a.target.value.length>this.threshold&&this.autoSuggest(a.target.value)},onClick:function(a){if(!1===this.used)b.set(a.target,"value",""),b.set(e("input#search_suggestion")[0],
"value",""),this.used=!0},autoSuggest:function(a){var c=33,d="";dojo.forEach(this.matches,function(b){if(a.toLowerCase()===b.substr(0,a.length)&&b.length>a.length&&b.length<c)c=b.length,d=b});b.set(e("input#search_suggestion")[0],"value",a+d.substr(a.length))}})});