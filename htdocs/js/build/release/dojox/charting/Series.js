//>>built
define("dojox/charting/Series",["dojo/_base/lang","dojo/_base/declare","./Element"],function(d,b,c){return b("dojox.charting.Series",c,{constructor:function(a,b,c){d.mixin(this,c);if("string"!=typeof this.plot)this.plot="default";this.update(b)},clear:function(){this.dyn={}},update:function(a){d.isArray(a)?this.data=a:(this.source=a,this.data=this.source.data,this.source.setSeriesObject&&this.source.setSeriesObject(this));this.dirty=!0;this.clear()}})});