//>>built
define("dojo/dnd/Source","../_base/array,../_base/connect,../_base/declare,../_base/kernel,../_base/lang,../dom-class,../dom-geometry,../mouse,../ready,../topic,./common,./Selector,./Manager".split(","),function(n,t,o,p,f,g,l,q,r,i,j,s,h){p.isAsync||r(0,function(){require(["dojo/dnd/AutoSource","dojo/dnd/Target"])});var e=o("dojo.dnd.Source",s,{isSource:!0,horizontal:!1,copyOnly:!1,selfCopy:!1,selfAccept:!0,skipForm:!1,withHandles:!1,autoSync:!1,delay:0,accept:["text"],generateText:!0,constructor:function(a,
c){f.mixin(this,f.mixin({},c));var b=this.accept;if(b.length){this.accept={};for(var d=0;d<b.length;++d)this.accept[b[d]]=1}this.mouseDown=this.isDragging=!1;this.targetBox=this.targetAnchor=null;this.before=!0;this._lastY=this._lastX=0;this.sourceState="";this.isSource&&g.add(this.node,"dojoDndSource");this.targetState="";this.accept&&g.add(this.node,"dojoDndTarget");this.horizontal&&g.add(this.node,"dojoDndHorizontal");this.topics=[i.subscribe("/dnd/source/over",f.hitch(this,"onDndSourceOver")),
i.subscribe("/dnd/start",f.hitch(this,"onDndStart")),i.subscribe("/dnd/drop",f.hitch(this,"onDndDrop")),i.subscribe("/dnd/cancel",f.hitch(this,"onDndCancel"))]},checkAcceptance:function(a,c){if(this==a)return!this.copyOnly||this.selfAccept;for(var b=0;b<c.length;++b){for(var d=a.getItem(c[b].id).type,m=!1,k=0;k<d.length;++k)if(d[k]in this.accept){m=!0;break}if(!m)return!1}return!0},copyState:function(a,c){if(a)return!0;2>arguments.length&&(c=this==h.manager().target);if(c){if(this.copyOnly)return this.selfCopy}else return this.copyOnly;
return!1},destroy:function(){e.superclass.destroy.call(this);n.forEach(this.topics,function(a){a.remove()});this.targetAnchor=null},onMouseMove:function(a){if(!(this.isDragging&&"Disabled"==this.targetState)){e.superclass.onMouseMove.call(this,a);var c=h.manager();if(!this.isDragging&&this.mouseDown&&this.isSource&&(Math.abs(a.pageX-this._lastX)>this.delay||Math.abs(a.pageY-this._lastY)>this.delay)){var b=this.getSelectedNodes();b.length&&c.startDrag(this,b,this.copyState(j.getCopyKeyState(a),!0))}if(this.isDragging){b=
!1;if(this.current){if(!this.targetBox||this.targetAnchor!=this.current)this.targetBox=l.position(this.current,!0);b=this.horizontal?a.pageX-this.targetBox.x<this.targetBox.w/2==l.isBodyLtr(this.current.ownerDocument):a.pageY-this.targetBox.y<this.targetBox.h/2}if(this.current!=this.targetAnchor||b!=this.before)this._markTargetAnchor(b),c.canDrop(!this.current||c.source!=this||!(this.current.id in this.selection))}}},onMouseDown:function(a){if(!this.mouseDown&&this._legalMouseDown(a)&&(!this.skipForm||
!j.isFormElement(a)))this.mouseDown=!0,this._lastX=a.pageX,this._lastY=a.pageY,e.superclass.onMouseDown.call(this,a)},onMouseUp:function(a){if(this.mouseDown)this.mouseDown=!1,e.superclass.onMouseUp.call(this,a)},onDndSourceOver:function(a){this!==a?(this.mouseDown=!1,this.targetAnchor&&this._unmarkTargetAnchor()):this.isDragging&&(a=h.manager(),a.canDrop("Disabled"!=this.targetState&&(!this.current||a.source!=this||!(this.current.id in this.selection))))},onDndStart:function(a,c,b){this.autoSync&&
this.sync();this.isSource&&this._changeState("Source",this==a?b?"Copied":"Moved":"");this._changeState("Target",this.accept&&this.checkAcceptance(a,c)?"":"Disabled");this==a&&h.manager().overSource(this);this.isDragging=!0},onDndDrop:function(a,c,b,d){if(this==d)this.onDrop(a,c,b);this.onDndCancel()},onDndCancel:function(){if(this.targetAnchor)this._unmarkTargetAnchor(),this.targetAnchor=null;this.before=!0;this.mouseDown=this.isDragging=!1;this._changeState("Source","");this._changeState("Target",
"")},onDrop:function(a,c,b){if(this!=a)this.onDropExternal(a,c,b);else this.onDropInternal(c,b)},onDropExternal:function(a,c,b){var d=this._normalizedCreator;this._normalizedCreator=this.creator?function(b,c){return d.call(this,a.getItem(b.id).data,c)}:b?function(b){var c=a.getItem(b.id),b=b.cloneNode(!0);b.id=j.getUniqueId();return{node:b,data:c.data,type:c.type}}:function(b){var c=a.getItem(b.id);a.delItem(b.id);return{node:b,data:c.data,type:c.type}};this.selectNone();!b&&!this.creator&&a.selectNone();
this.insertNodes(!0,c,this.before,this.current);!b&&this.creator&&a.deleteSelectedNodes();this._normalizedCreator=d},onDropInternal:function(a,c){var b=this._normalizedCreator;if(!(this.current&&this.current.id in this.selection)){if(c)this._normalizedCreator=this.creator?function(a,c){return b.call(this,this.getItem(a.id).data,c)}:function(a){var b=this.getItem(a.id),a=a.cloneNode(!0);a.id=j.getUniqueId();return{node:a,data:b.data,type:b.type}};else{if(!this.current)return;this._normalizedCreator=
function(a){var b=this.getItem(a.id);return{node:a,data:b.data,type:b.type}}}this._removeSelection();this.insertNodes(!0,a,this.before,this.current);this._normalizedCreator=b}},onDraggingOver:function(){},onDraggingOut:function(){},onOverEvent:function(){e.superclass.onOverEvent.call(this);h.manager().overSource(this);if(this.isDragging&&"Disabled"!=this.targetState)this.onDraggingOver()},onOutEvent:function(){e.superclass.onOutEvent.call(this);h.manager().outSource(this);if(this.isDragging&&"Disabled"!=
this.targetState)this.onDraggingOut()},_markTargetAnchor:function(a){if(!(this.current==this.targetAnchor&&this.before==a))this.targetAnchor&&this._removeItemClass(this.targetAnchor,this.before?"Before":"After"),this.targetAnchor=this.current,this.targetBox=null,this.before=a,this.targetAnchor&&this._addItemClass(this.targetAnchor,this.before?"Before":"After")},_unmarkTargetAnchor:function(){if(this.targetAnchor)this._removeItemClass(this.targetAnchor,this.before?"Before":"After"),this.targetBox=
this.targetAnchor=null,this.before=!0},_markDndStatus:function(a){this._changeState("Source",a?"Copied":"Moved")},_legalMouseDown:function(a){if("touchstart"!=a.type&&!q.isLeft(a))return!1;if(!this.withHandles)return!0;for(a=a.target;a&&a!==this.node;a=a.parentNode){if(g.contains(a,"dojoDndHandle"))return!0;if(g.contains(a,"dojoDndItem")||g.contains(a,"dojoDndIgnore"))break}return!1}});return e});