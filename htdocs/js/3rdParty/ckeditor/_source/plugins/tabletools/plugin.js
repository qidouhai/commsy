//>>built
define("ckeditor/_source/plugins/tabletools/plugin",["dijit","dojo","dojox"],function(){(function(){function o(b){function c(b){!(0<a.length)&&b.type==CKEDITOR.NODE_ELEMENT&&z.test(b.getName())&&!b.getCustomData("selected_cell")&&(CKEDITOR.dom.element.setMarker(f,b,"selected_cell",!0),a.push(b))}for(var b=b.getRanges(),a=[],f={},d=0;d<b.length;d++){var g=b[d];if(g.collapsed)g=g.getCommonAncestor(),(g=g.getAscendant("td",!0)||g.getAscendant("th",!0))&&a.push(g);else{var g=new CKEDITOR.dom.walker(g),
e;for(g.guard=c;e=g.next();)if((e=e.getAscendant("td")||e.getAscendant("th"))&&!e.getCustomData("selected_cell"))CKEDITOR.dom.element.setMarker(f,e,"selected_cell",!0),a.push(e)}}CKEDITOR.dom.element.clearAllMarkers(f);return a}function v(b,c){for(var a=o(b),f=a[0],d=f.getAscendant("table"),f=f.getDocument(),g=a[0].getParent(),e=g.$.rowIndex,a=a[a.length-1],h=a.getParent().$.rowIndex+a.$.rowSpan-1,a=new CKEDITOR.dom.element(d.$.rows[h]),e=c?e:h,g=c?g:a,a=CKEDITOR.tools.buildTableMap(d),d=a[e],e=c?
a[e-1]:a[e+1],a=a[0].length,f=f.createElement("tr"),h=0;d[h]&&h<a;h++){var i;1<d[h].rowSpan&&e&&d[h]==e[h]?(i=d[h],i.rowSpan+=1):(i=(new CKEDITOR.dom.element(d[h])).clone(),i.removeAttribute("rowSpan"),!CKEDITOR.env.ie&&i.appendBogus(),f.append(i),i=i.$);h+=i.colSpan-1}c?f.insertBefore(g):f.insertAfter(g)}function n(b){if(b instanceof CKEDITOR.dom.selection){for(var c=o(b),a=c[0].getAscendant("table"),f=CKEDITOR.tools.buildTableMap(a),b=c[0].getParent().$.rowIndex,c=c[c.length-1],d=c.getParent().$.rowIndex+
c.$.rowSpan-1,c=[],g=b;g<=d;g++){for(var e=f[g],h=new CKEDITOR.dom.element(a.$.rows[g]),i=0;i<e.length;i++){var j=new CKEDITOR.dom.element(e[i]),l=j.getParent().$.rowIndex;1==j.$.rowSpan?j.remove():(j.$.rowSpan-=1,l==g&&(l=f[g+1],l[i-1]?j.insertAfter(new CKEDITOR.dom.element(l[i-1])):(new CKEDITOR.dom.element(a.$.rows[g+1])).append(j,1)));i+=j.$.colSpan-1}c.push(h)}f=a.$.rows;a=new CKEDITOR.dom.element(f[d+1]||(0<b?f[b-1]:null)||a.$.parentNode);for(g=c.length;0<=g;g--)n(c[g]);return a}b instanceof
CKEDITOR.dom.element&&(a=b.getAscendant("table"),1==a.$.rows.length?a.remove():b.remove());return null}function t(b,c){for(var a=c?Infinity:0,f=0;f<b.length;f++){var d;d=b[f];for(var g=c,e=d.getParent().$.cells,h=0,i=0;i<e.length;i++){var j=e[i],h=h+(g?1:j.colSpan);if(j==d.$)break}d=h-1;if(c?d<a:d>a)a=d}return a}function r(b,c){for(var a=o(b),f=a[0].getAscendant("table"),d=t(a,1),a=t(a),d=c?d:a,g=CKEDITOR.tools.buildTableMap(f),f=[],a=[],e=g.length,h=0;h<e;h++){f.push(g[h][d]);var i=c?g[h][d-1]:g[h][d+
1];i&&a.push(i)}for(h=0;h<e;h++)1<f[h].colSpan&&a.length&&a[h]==f[h]?(d=f[h],d.colSpan+=1):(d=(new CKEDITOR.dom.element(f[h])).clone(),d.removeAttribute("colSpan"),!CKEDITOR.env.ie&&d.appendBogus(),d[c?"insertBefore":"insertAfter"].call(d,new CKEDITOR.dom.element(f[h])),d=d.$),h+=d.rowSpan-1}function s(b,c){var a=b.getStartElement();if(a=a.getAscendant("td",1)||a.getAscendant("th",1)){var f=a.clone();CKEDITOR.env.ie||f.appendBogus();c?f.insertBefore(a):f.insertAfter(a)}}function p(b){if(b instanceof
CKEDITOR.dom.selection){var b=o(b),c=b[0]&&b[0].getAscendant("table"),a;a:{var f=0;a=b.length-1;for(var d={},g,e;g=b[f++];)CKEDITOR.dom.element.setMarker(d,g,"delete_cell",!0);for(f=0;g=b[f++];)if((e=g.getPrevious())&&!e.getCustomData("delete_cell")||(e=g.getNext())&&!e.getCustomData("delete_cell")){CKEDITOR.dom.element.clearAllMarkers(d);a=e;break a}CKEDITOR.dom.element.clearAllMarkers(d);e=b[0].getParent();(e=e.getPrevious())?a=e.getLast():(e=b[a].getParent(),a=(e=e.getNext())?e.getChild(0):null)}for(e=
b.length-1;0<=e;e--)p(b[e]);a?m(a,!0):c&&c.remove()}else b instanceof CKEDITOR.dom.element&&(c=b.getParent(),1==c.getChildCount()?c.remove():b.remove())}function m(b,c){var a=new CKEDITOR.dom.range(b.getDocument());if(!a["moveToElementEdit"+(c?"End":"Start")](b))a.selectNodeContents(b),a.collapse(c?!1:!0);a.select(!0)}function u(b,c,a){b=b[c];if("undefined"==typeof a)return b;for(c=0;b&&c<b.length;c++){if(a.is&&b[c]==a.$)return c;if(c==a)return new CKEDITOR.dom.element(b[c])}return a.is?-1:null}function q(b,
c,a){var f=o(b),d;if((c?1!=f.length:2>f.length)||(d=b.getCommonAncestor())&&d.type==CKEDITOR.NODE_ELEMENT&&d.is("table"))return!1;var g,b=f[0];d=b.getAscendant("table");var e=CKEDITOR.tools.buildTableMap(d),h=e.length,i=e[0].length,j=b.getParent().$.rowIndex,l=u(e,j,b);if(c){var k;try{var m=parseInt(b.getAttribute("rowspan"),10)||1;g=parseInt(b.getAttribute("colspan"),10)||1;k=e["up"==c?j-m:"down"==c?j+m:j]["left"==c?l-g:"right"==c?l+g:l]}catch(v){return!1}if(!k||b.$==k)return!1;f["up"==c||"left"==
c?"unshift":"push"](new CKEDITOR.dom.element(k))}for(var c=b.getDocument(),n=j,m=k=0,q=!a&&new CKEDITOR.dom.documentFragment(c),r=0,c=0;c<f.length;c++){g=f[c];var p=g.getParent(),t=g.getFirst(),s=g.$.colSpan,w=g.$.rowSpan,p=p.$.rowIndex,x=u(e,p,g),r=r+s*w,m=Math.max(m,x-l+s);k=Math.max(k,p-j+w);if(!a){s=g;(w=s.getBogus())&&w.remove();s.trim();if(g.getChildren().count()){if(p!=n&&t&&(!t.isBlockBoundary||!t.isBlockBoundary({br:1})))(n=q.getLast(CKEDITOR.dom.walker.whitespaces(!0)))&&(!n.is||!n.is("br"))&&
q.append("br");g.moveChildren(q)}c?g.remove():g.setHtml("")}n=p}if(a)return k*m==r;q.moveChildren(b);CKEDITOR.env.ie||b.appendBogus();m>=i?b.removeAttribute("rowSpan"):b.$.rowSpan=k;k>=h?b.removeAttribute("colSpan"):b.$.colSpan=m;a=new CKEDITOR.dom.nodeList(d.$.rows);f=a.count();for(c=f-1;0<=c;c--)d=a.getItem(c),d.$.cells.length||(d.remove(),f++);return b}function x(b,c){var a=o(b);if(1<a.length)return!1;if(c)return!0;var a=a[0],f=a.getParent(),d=f.getAscendant("table"),g=CKEDITOR.tools.buildTableMap(d),
e=f.$.rowIndex,h=u(g,e,a),i=a.$.rowSpan,j;if(1<i){j=Math.ceil(i/2);for(var i=Math.floor(i/2),f=e+j,d=new CKEDITOR.dom.element(d.$.rows[f]),g=u(g,f),l,f=a.clone(),e=0;e<g.length;e++)if(l=g[e],l.parentNode==d.$&&e>h){f.insertBefore(new CKEDITOR.dom.element(l));break}else l=null;l||d.append(f,!0)}else{i=j=1;d=f.clone();d.insertAfter(f);d.append(f=a.clone());l=u(g,e);for(h=0;h<l.length;h++)l[h].rowSpan++}CKEDITOR.env.ie||f.appendBogus();a.$.rowSpan=j;f.$.rowSpan=i;1==j&&a.removeAttribute("rowSpan");1==
i&&f.removeAttribute("rowSpan");return f}function y(b,c){var a=o(b);if(1<a.length)return!1;if(c)return!0;var a=a[0],f=a.getParent(),d=f.getAscendant("table"),d=CKEDITOR.tools.buildTableMap(d),g=u(d,f.$.rowIndex,a),e=a.$.colSpan;if(1<e)f=Math.ceil(e/2),e=Math.floor(e/2);else{for(var e=f=1,h=[],i=0;i<d.length;i++){var j=d[i];h.push(j[g]);1<j[g].rowSpan&&(i+=j[g].rowSpan-1)}for(d=0;d<h.length;d++)h[d].colSpan++}d=a.clone();d.insertAfter(a);CKEDITOR.env.ie||d.appendBogus();a.$.colSpan=f;d.$.colSpan=e;
1==f&&a.removeAttribute("colSpan");1==e&&d.removeAttribute("colSpan");return d}var z=/^(?:td|th)$/,A={thead:1,tbody:1,tfoot:1,td:1,tr:1,th:1};CKEDITOR.plugins.tabletools={requires:["table","dialog","contextmenu"],init:function(b){var c=b.lang.table;b.addCommand("cellProperties",new CKEDITOR.dialogCommand("cellProperties"));CKEDITOR.dialog.add("cellProperties",this.path+"dialogs/tableCell.js");b.addCommand("tableDelete",{exec:function(a){var e;var b=a.getSelection();if(e=(b=b&&b.getStartElement())&&
b.getAscendant("table",1),b=e){var d=b.getParent();1==d.getChildCount()&&!d.is("body","td","th")&&(b=d);a=new CKEDITOR.dom.range(a.document);a.moveToPosition(b,CKEDITOR.POSITION_BEFORE_START);b.remove();a.select()}}});b.addCommand("rowDelete",{exec:function(a){a=a.getSelection();m(n(a))}});b.addCommand("rowInsertBefore",{exec:function(a){a=a.getSelection();v(a,!0)}});b.addCommand("rowInsertAfter",{exec:function(a){a=a.getSelection();v(a)}});b.addCommand("columnDelete",{exec:function(a){for(var a=
a.getSelection(),a=o(a),b=a[0],d=a[a.length-1],a=b.getAscendant("table"),c=CKEDITOR.tools.buildTableMap(a),e,h,i=[],j=0,l=c.length;j<l;j++)for(var k=0,n=c[j].length;k<n;k++)c[j][k]==b.$&&(e=k),c[j][k]==d.$&&(h=k);for(j=e;j<=h;j++)for(k=0;k<c.length;k++)d=c[k],b=new CKEDITOR.dom.element(a.$.rows[k]),d=new CKEDITOR.dom.element(d[j]),d.$&&(1==d.$.colSpan?d.remove():d.$.colSpan-=1,k+=d.$.rowSpan-1,b.$.cells.length||i.push(b));h=a.$.rows[0]&&a.$.rows[0].cells;e=new CKEDITOR.dom.element(h[e]||(e?h[e-1]:
a.$.parentNode));i.length==l&&a.remove();e&&m(e,!0)}});b.addCommand("columnInsertBefore",{exec:function(a){a=a.getSelection();r(a,!0)}});b.addCommand("columnInsertAfter",{exec:function(a){a=a.getSelection();r(a)}});b.addCommand("cellDelete",{exec:function(a){a=a.getSelection();p(a)}});b.addCommand("cellMerge",{exec:function(a){m(q(a.getSelection()),!0)}});b.addCommand("cellMergeRight",{exec:function(a){m(q(a.getSelection(),"right"),!0)}});b.addCommand("cellMergeDown",{exec:function(a){m(q(a.getSelection(),
"down"),!0)}});b.addCommand("cellVerticalSplit",{exec:function(a){m(x(a.getSelection()))}});b.addCommand("cellHorizontalSplit",{exec:function(a){m(y(a.getSelection()))}});b.addCommand("cellInsertBefore",{exec:function(a){a=a.getSelection();s(a,!0)}});b.addCommand("cellInsertAfter",{exec:function(a){a=a.getSelection();s(a)}});b.addMenuItems&&b.addMenuItems({tablecell:{label:c.cell.menu,group:"tablecell",order:1,getItems:function(){var a=b.getSelection(),c=o(a);return{tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,
tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,tablecell_delete:CKEDITOR.TRISTATE_OFF,tablecell_merge:q(a,null,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_right:q(a,"right",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_merge_down:q(a,"down",!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_vertical:x(a,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_split_horizontal:y(a,!0)?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED,tablecell_properties:0<
c.length?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED}}},tablecell_insertBefore:{label:c.cell.insertBefore,group:"tablecell",command:"cellInsertBefore",order:5},tablecell_insertAfter:{label:c.cell.insertAfter,group:"tablecell",command:"cellInsertAfter",order:10},tablecell_delete:{label:c.cell.deleteCell,group:"tablecell",command:"cellDelete",order:15},tablecell_merge:{label:c.cell.merge,group:"tablecell",command:"cellMerge",order:16},tablecell_merge_right:{label:c.cell.mergeRight,group:"tablecell",
command:"cellMergeRight",order:17},tablecell_merge_down:{label:c.cell.mergeDown,group:"tablecell",command:"cellMergeDown",order:18},tablecell_split_horizontal:{label:c.cell.splitHorizontal,group:"tablecell",command:"cellHorizontalSplit",order:19},tablecell_split_vertical:{label:c.cell.splitVertical,group:"tablecell",command:"cellVerticalSplit",order:20},tablecell_properties:{label:c.cell.title,group:"tablecellproperties",command:"cellProperties",order:21},tablerow:{label:c.row.menu,group:"tablerow",
order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF}}},tablerow_insertBefore:{label:c.row.insertBefore,group:"tablerow",command:"rowInsertBefore",order:5},tablerow_insertAfter:{label:c.row.insertAfter,group:"tablerow",command:"rowInsertAfter",order:10},tablerow_delete:{label:c.row.deleteRow,group:"tablerow",command:"rowDelete",order:15},tablecolumn:{label:c.column.menu,group:"tablecolumn",order:1,
getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF}}},tablecolumn_insertBefore:{label:c.column.insertBefore,group:"tablecolumn",command:"columnInsertBefore",order:5},tablecolumn_insertAfter:{label:c.column.insertAfter,group:"tablecolumn",command:"columnInsertAfter",order:10},tablecolumn_delete:{label:c.column.deleteColumn,group:"tablecolumn",command:"columnDelete",order:15}});b.contextMenu&&
b.contextMenu.addListener(function(a){if(!a||a.isReadOnly())return null;for(;a;){if(a.getName()in A)return{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF};a=a.getParent()}return null})},getSelectedCells:o};CKEDITOR.plugins.add("tabletools",CKEDITOR.plugins.tabletools)})();CKEDITOR.tools.buildTableMap=function(o){for(var o=o.$.rows,v=-1,n=[],t=0;t<o.length;t++){v++;!n[v]&&(n[v]=[]);for(var r=-1,s=0;s<o[t].cells.length;s++){var p=o[t].cells[s];for(r++;n[v][r];)r++;
for(var m=isNaN(p.colSpan)?1:p.colSpan,p=isNaN(p.rowSpan)?1:p.rowSpan,u=0;u<p;u++){n[v+u]||(n[v+u]=[]);for(var q=0;q<m;q++)n[v+u][r+q]=o[t].cells[s]}r+=m-1}}return n}});