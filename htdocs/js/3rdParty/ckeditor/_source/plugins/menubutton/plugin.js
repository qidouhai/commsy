//>>built
define("ckeditor/_source/plugins/menubutton/plugin",["dijit","dojo","dojox"],function(){CKEDITOR.plugins.add("menubutton",{requires:["button","menu"],beforeInit:function(d){d.ui.addHandler(CKEDITOR.UI_MENUBUTTON,CKEDITOR.ui.menuButton.handler)}});CKEDITOR.UI_MENUBUTTON="menubutton";(function(){var d=function(a){var b=this._;if(b.state!==CKEDITOR.TRISTATE_DISABLED){b.previousState=b.state;var c=b.menu;if(!c)c=b.menu=new CKEDITOR.menu(a,{panel:{className:a.skinClass+" cke_contextmenu",attributes:{"aria-label":a.lang.common.options}}}),
c.onHide=CKEDITOR.tools.bind(function(){this.setState(this.modes&&this.modes[a.mode]?b.previousState:CKEDITOR.TRISTATE_DISABLED)},this),this.onMenu&&c.addListener(this.onMenu);b.on?c.hide():(this.setState(CKEDITOR.TRISTATE_ON),c.show(CKEDITOR.document.getById(this._.id),4))}};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(a){delete a.panel;this.base(a);this.hasArrow=!0;this.click=d},statics:{handler:{create:function(a){return new CKEDITOR.ui.menuButton(a)}}}})})()});