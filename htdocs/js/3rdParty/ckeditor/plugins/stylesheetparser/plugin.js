//>>built
define("ckeditor/plugins/stylesheetparser/plugin",["dijit","dojo","dojox"],function(){(function(){function i(b,g,d){var e=[],f=[],a;for(a=0;a<b.styleSheets.length;a++){var c=b.styleSheets[a];if(!(c.ownerNode||c.owningElement).getAttribute("data-cke-temp")&&!(c.href&&"chrome://"==c.href.substr(0,9)))for(var c=c.cssRules||c.rules,h=0;h<c.length;h++)f.push(c[h].selectorText)}a=f.join(" ");a=a.replace(/(,|>|\+|~)/g," ");a=a.replace(/\[[^\]]*/g,"");a=a.replace(/#[^\s]*/g,"");a=a.replace(/\:{1,2}[^\s]*/g,
"");a=a.replace(/\s+/g," ");a=a.split(" ");b=[];for(f=0;f<a.length;f++)c=a[f],d.test(c)&&!g.test(c)&&-1==CKEDITOR.tools.indexOf(b,c)&&b.push(c);for(a=0;a<b.length;a++)d=b[a].split("."),g=d[0].toLowerCase(),d=d[1],e.push({name:g+"."+d,element:g,attributes:{"class":d}});return e}CKEDITOR.plugins.add("stylesheetparser",{requires:["styles"],onLoad:function(){var b=CKEDITOR.editor.prototype;b.getStylesSet=CKEDITOR.tools.override(b.getStylesSet,function(b){return function(d){var e=this;b.call(this,function(b){d(e._.stylesDefinitions=
b.concat(i(e.document.$,e.config.stylesheetParser_skipSelectors||/(^body\.|^\.)/i,e.config.stylesheetParser_validSelectors||/\w+\.\w+/)))})}})}})})()});