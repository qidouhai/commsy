//>>built
define("commsy/bar/CalendarAbo","dojo/_base/declare,dijit/_WidgetBase,commsy/base,dijit/_TemplatedMixin,dojo/_base/lang,dojo/dom-construct,dojo/dom-attr,dojo/query,dojo/on,dojo/i18n!./nls/calendar".split(","),function(b,c,d,e){return b([d,c,e],{baseClass:"CommSyWidgetBorderless",widgetHandler:null,itemId:null,constructor:function(a){a=a||{};b.safeMixin(this,a)},postCreate:function(){this.inherited(arguments);this.itemId=this.from_php.ownRoom.id}})});