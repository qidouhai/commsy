//>>built
define("dojox/charting/widget/Sparkline","dojo/_base/lang,dojo/_base/array,dojo/_base/declare,dojo/query,./Chart,../themes/GreySkies,../plot2d/Lines,dojo/dom-prop".split(","),function(j,e,f,g,h,i,k,b){f("dojox.charting.widget.Sparkline",h,{theme:i,margins:{l:0,r:0,t:0,b:0},type:"Lines",valueFn:"Number(x)",store:"",field:"",query:"",queryOptions:"",start:"0",count:"Infinity",sort:"",data:"",name:"default",buildRendering:function(){var a=this.srcNodeRef;if(!a.childNodes.length||!g("> .axis, > .plot, > .action, > .series",
a).length){var d=document.createElement("div");b.set(d,{"class":"plot",name:"default",type:this.type});a.appendChild(d);var c=document.createElement("div");b.set(c,{"class":"series",plot:"default",name:this.name,start:this.start,count:this.count,valueFn:this.valueFn});e.forEach("store,field,query,queryOptions,sort,data".split(","),function(a){this[a].length&&b.set(c,a,this[a])},this);a.appendChild(c)}this.inherited(arguments)}})});