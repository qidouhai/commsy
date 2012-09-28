//>>built
define("ckeditor/_source/core/dom/walker",["dijit","dojo","dojox"],function(){(function(){function f(b,d){var c=this.range;if(this._.end)return null;if(!this._.start){this._.start=1;if(c.collapsed)return this.end(),null;c.optimize()}var a,e=c.startContainer;a=c.endContainer;var m=c.startOffset,c=c.endOffset,g,f=this.guard,j=this.type,h=b?"getPreviousSourceNode":"getNextSourceNode";if(!b&&!this._.guardLTR){var k=a.type==CKEDITOR.NODE_ELEMENT?a:a.getParent(),i=a.type==CKEDITOR.NODE_ELEMENT?a.getChild(c):
a.getNext();this._.guardLTR=function(a,b){return(!b||!k.equals(a))&&(!i||!a.equals(i))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||"body"!=a.getName())}}if(b&&!this._.guardRTL){var l=e.type==CKEDITOR.NODE_ELEMENT?e:e.getParent(),n=e.type==CKEDITOR.NODE_ELEMENT?m?e.getChild(m-1):null:e.getPrevious();this._.guardRTL=function(a,b){return(!b||!l.equals(a))&&(!n||!a.equals(n))&&(a.type!=CKEDITOR.NODE_ELEMENT||!b||"body"!=a.getName())}}var o=b?this._.guardRTL:this._.guardLTR;g=f?function(a,b){return!1===o(a,b)?
!1:f(a,b)}:o;if(this.current)a=this.current[h](!1,j,g);else{if(b)a.type==CKEDITOR.NODE_ELEMENT&&(a=0<c?a.getChild(c-1):!1===g(a,!0)?null:a.getPreviousSourceNode(!0,j,g));else if(a=e,a.type==CKEDITOR.NODE_ELEMENT&&!(a=a.getChild(m)))a=!1===g(e,!0)?null:e.getNextSourceNode(!0,j,g);a&&!1===g(a)&&(a=null)}for(;a&&!this._.end;){this.current=a;if(!this.evaluator||!1!==this.evaluator(a)){if(!d)return a}else if(d&&this.evaluator)return!1;a=a[h](!1,j,g)}this.end();return this.current=null}function h(b){for(var d,
c=null;d=f.call(this,b);)c=d;return c}CKEDITOR.dom.walker=CKEDITOR.tools.createClass({$:function(b){this.range=b;this._={}},proto:{end:function(){this._.end=1},next:function(){return f.call(this)},previous:function(){return f.call(this,1)},checkForward:function(){return!1!==f.call(this,0,1)},checkBackward:function(){return!1!==f.call(this,1,1)},lastForward:function(){return h.call(this)},lastBackward:function(){return h.call(this,1)},reset:function(){delete this.current;this._={}}}});var p={block:1,
"list-item":1,table:1,"table-row-group":1,"table-header-group":1,"table-footer-group":1,"table-row":1,"table-column-group":1,"table-column":1,"table-cell":1,"table-caption":1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(b){b=b?CKEDITOR.tools.extend({},CKEDITOR.dtd.$block,b||{}):CKEDITOR.dtd.$block;return"none"==this.getComputedStyle("float")&&p[this.getComputedStyle("display")]||b[this.getName()]};CKEDITOR.dom.walker.blockBoundary=function(b){return function(d){return!(d.type==CKEDITOR.NODE_ELEMENT&&
d.isBlockBoundary(b))}};CKEDITOR.dom.walker.listItemBoundary=function(){return this.blockBoundary({br:1})};CKEDITOR.dom.walker.bookmark=function(b,d){function c(a){return a&&a.getName&&"span"==a.getName()&&a.data("cke-bookmark")}return function(a){var e,f;e=a&&!a.getName&&(f=a.getParent())&&c(f);e=b?e:e||c(a);return!!(d^e)}};CKEDITOR.dom.walker.whitespaces=function(b){return function(d){d=d&&d.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(d.getText());return!!(b^d)}};CKEDITOR.dom.walker.invisible=
function(b){var d=CKEDITOR.dom.walker.whitespaces();return function(c){c=d(c)||c.is&&!c.$.offsetHeight;return!!(b^c)}};CKEDITOR.dom.walker.nodeType=function(b,d){return function(c){return!!(d^c.type==b)}};CKEDITOR.dom.walker.bogus=function(b){function d(b){return!k(b)&&!i(b)}return function(c){var a=!CKEDITOR.env.ie?c.is&&c.is("br"):c.getText&&l.test(c.getText());a&&(a=c.getParent(),c=c.getNext(d),a=a.isBlockBoundary()&&(!c||c.type==CKEDITOR.NODE_ELEMENT&&c.isBlockBoundary()));return!!(b^a)}};var l=
/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,k=CKEDITOR.dom.walker.whitespaces(),i=CKEDITOR.dom.walker.bookmark();CKEDITOR.dom.element.prototype.getBogus=function(){var b=this;do b=b.getPreviousSourceNode();while(i(b)||k(b)||b.type==CKEDITOR.NODE_ELEMENT&&b.getName()in CKEDITOR.dtd.$inline&&!(b.getName()in CKEDITOR.dtd.$empty));return b&&(!CKEDITOR.env.ie?b.is&&b.is("br"):b.getText&&l.test(b.getText()))?b:!1}})()});