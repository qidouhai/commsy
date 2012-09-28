//>>built
define("dojox/charting/plot2d/Default","dojo/_base/lang,dojo/_base/declare,dojo/_base/array,./CartesianBase,./_PlotEvents,./common,dojox/lang/functional,dojox/lang/functional/reversed,dojox/lang/utils,dojox/gfx/fx".split(","),function(v,w,j,D,E,m,F,G,r,H){var I=G.lambda("item.purgeGroup()");return w("dojox.charting.plot2d.Default",[D,E],{defaultParams:{hAxis:"x",vAxis:"y",lines:!0,areas:!1,markers:!1,tension:"",animate:!1,enableCache:!1,interpolate:!1},optionalParams:{stroke:{},outline:{},shadow:{},
fill:{},styleFunc:null,font:"",fontColor:"",marker:"",markerStroke:{},markerOutline:{},markerShadow:{},markerFill:{},markerFont:"",markerFontColor:""},constructor:function(d,c){this.opt=v.clone(this.defaultParams);r.updateWithObject(this.opt,c);r.updateWithPattern(this.opt,c,this.optionalParams);this.series=[];this.hAxis=this.opt.hAxis;this.vAxis=this.opt.vAxis;this.animate=this.opt.animate},createPath:function(d,c,b){var f;this.opt.enableCache&&0<d._pathFreePool.length?(f=d._pathFreePool.pop(),f.setShape(b),
c.add(f)):f=c.createPath(b);this.opt.enableCache&&d._pathUsePool.push(f);return f},buildSegments:function(d,c){for(var b=this.series[d],f=c?Math.max(0,Math.floor(this._hScaler.bounds.from-1)):0,j=c?Math.min(b.data.length,Math.ceil(this._hScaler.bounds.to)):b.data.length,g=null,m=[];f<j;f++)if(null!=b.data[f]&&(c||null!=b.data[f].y))g||(g=[],m.push({index:f,rseg:g})),g.push(c&&b.data[f].hasOwnProperty("y")?b.data[f].y:b.data[f]);else if(!this.opt.interpolate||c)g=null;return m},render:function(d,c){if(this.zoom&&
!this.isDataDirty())return this.performZoom(d,c);this.resetEvents();this.dirty=this.isDirty();var b;if(this.dirty)j.forEach(this.series,I),this._eventSeries={},this.cleanGroup(),this.group.setTransform(null),b=this.group,F.forEachRev(this.series,function(a){a.cleanGroup(b)});for(var f=this.chart.theme,q,g,r=this.events(),s=this.series.length-1;0<=s;--s){var a=this.series[s];if(!this.dirty&&!a.dirty)f.skip(),this._reconnectEvents(a.name);else{a.cleanGroup();if(this.opt.enableCache)a._pathFreePool=
(a._pathFreePool?a._pathFreePool:[]).concat(a._pathUsePool?a._pathUsePool:[]),a._pathUsePool=[];if(a.data.length){var h=f.next(this.opt.areas?"area":"line",[this.opt,a],!0),e,x=this._hScaler.scaler.getTransformerFromModel(this._hScaler),y=this._vScaler.scaler.getTransformerFromModel(this._vScaler),w=this._eventSeries[a.name]=Array(a.data.length);b=a.group;for(var t=j.some(a.data,function(a){return"number"==typeof a||a&&!a.hasOwnProperty("x")}),u=this.buildSegments(s,t),o=0;o<u.length;o++){var i=u[o];
e=t?j.map(i.rseg,function(a,b){return{x:x(b+i.index+1)+c.l,y:d.height-c.b-y(a),data:a}},this):j.map(i.rseg,function(a){return{x:x(a.x)+c.l,y:d.height-c.b-y(a.y),data:a}},this);if(t&&this.opt.interpolate)for(;o<u.length;)o++,(i=u[o])&&(e=e.concat(j.map(i.rseg,function(a,b){return{x:x(b+i.index+1)+c.l,y:d.height-c.b-y(a),data:a}},this)));var z=this.opt.tension?m.curve(e,this.opt.tension):"";if(this.opt.areas&&1<e.length){var p=this._plotFill(h.series.fill,d,c),l=v.clone(e);this.opt.tension?a.dyn.fill=
b.createPath(z+" "+("L"+l[l.length-1].x+","+(d.height-c.b)+" L"+l[0].x+","+(d.height-c.b)+" L"+l[0].x+","+l[0].y)).setFill(p).getFill():(l.push({x:e[e.length-1].x,y:d.height-c.b}),l.push({x:e[0].x,y:d.height-c.b}),l.push(e[0]),a.dyn.fill=b.createPolyline(l).setFill(p).getFill())}if(this.opt.lines||this.opt.markers)if(q=h.series.stroke,h.series.outline)g=a.dyn.outline=m.makeStroke(h.series.outline),g.width=2*g.width+q.width;if(this.opt.markers)a.dyn.marker=h.symbol;var A=null,B=null,C=null;if(q&&h.series.shadow&&
1<e.length){var n=h.series.shadow,p=j.map(e,function(a){return{x:a.x+n.dx,y:a.y+n.dy}});if(this.opt.lines)a.dyn.shadow=this.opt.tension?b.createPath(m.curve(p,this.opt.tension)).setStroke(n).getStroke():b.createPolyline(p).setStroke(n).getStroke();if(this.opt.markers&&h.marker.shadow)n=h.marker.shadow,C=j.map(p,function(c){return this.createPath(a,b,"M"+c.x+" "+c.y+" "+h.symbol).setStroke(n).setFill(n.color)},this)}if(this.opt.lines&&1<e.length){if(g)a.dyn.outline=this.opt.tension?b.createPath(z).setStroke(g).getStroke():
b.createPolyline(e).setStroke(g).getStroke();a.dyn.stroke=this.opt.tension?b.createPath(z).setStroke(q).getStroke():b.createPolyline(e).setStroke(q).getStroke()}if(this.opt.markers){var k=h,A=Array(e.length),B=Array(e.length);g=null;if(k.marker.outline)g=m.makeStroke(k.marker.outline),g.width=2*g.width+(k.marker.stroke?k.marker.stroke.width:0);j.forEach(e,function(c,e){if(this.opt.styleFunc||"number"!=typeof c.data){var d="number"!=typeof c.data?[c.data]:[];this.opt.styleFunc&&d.push(this.opt.styleFunc(c.data));
k=f.addMixin(h,"marker",d,!0)}else k=f.post(h,"marker");d="M"+c.x+" "+c.y+" "+k.symbol;g&&(B[e]=this.createPath(a,b,d).setStroke(g));A[e]=this.createPath(a,b,d).setStroke(k.marker.stroke).setFill(k.marker.fill)},this);a.dyn.markerFill=k.marker.fill;a.dyn.markerStroke=k.marker.stroke;r?j.forEach(A,function(c,b){var d={element:"marker",index:b+i.index,run:a,shape:c,outline:B[b]||null,shadow:C&&C[b]||null,cx:e[b].x,cy:e[b].y};t?(d.x=b+i.index+1,d.y=i.rseg[b]):(d.x=i.rseg[b].x,d.y=i.rseg[b].y);this._connectEvents(d);
w[b+i.index]=d},this):delete this._eventSeries[a.name]}}a.dirty=!1}else a.dirty=!1,f.skip()}}this.animate&&H.animateTransform(v.delegate({shape:this.group,duration:1200,transform:[{name:"translate",start:[0,d.height-c.b],end:[0,0]},{name:"scale",start:[1,0],end:[1,1]},{name:"original"}]},this.animate)).play();this.dirty=!1;return this}})});