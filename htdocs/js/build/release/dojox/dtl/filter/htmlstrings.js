//>>built
define("dojox/dtl/filter/htmlstrings",["dojo/_base/lang","../_base"],function(g,e){g.getObject("dojox.dtl.filter.htmlstrings",!0);g.mixin(e.filter.htmlstrings,{_linebreaksrn:/(\r\n|\n\r)/g,_linebreaksn:/\n{2,}/g,_linebreakss:/(^\s+|\s+$)/g,_linebreaksbr:/\n/g,_removetagsfind:/[a-z0-9]+/g,_striptags:/<[^>]*?>/g,linebreaks:function(a){for(var c=[],d=e.filter.htmlstrings,a=a.replace(d._linebreaksrn,"\n"),a=a.split(d._linebreaksn),b=0;b<a.length;b++){var f=a[b].replace(d._linebreakss,"").replace(d._linebreaksbr,
"<br />");c.push("<p>"+f+"</p>")}return c.join("\n\n")},linebreaksbr:function(a){var c=e.filter.htmlstrings;return a.replace(c._linebreaksrn,"\n").replace(c._linebreaksbr,"<br />")},removetags:function(a,c){for(var d=e.filter.htmlstrings,b=[],f;f=d._removetagsfind.exec(c);)b.push(f[0]);b="("+b.join("|")+")";return a.replace(RegExp("</?s*"+b+"s*[^>]*>","gi"),"")},striptags:function(a){return a.replace(dojox.dtl.filter.htmlstrings._striptags,"")}});return dojox.dtl.filter.htmlstrings});