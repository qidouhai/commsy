define([	"dojo/_base/declare",
        	"commsy/ClickPopupHandler",
        	"dojo/query",
        	"dojo/dom-class",
        	"dojo/_base/lang",
        	"dojo/dom-construct",
        	"dojo/dom-attr",
        	"dojo/on"], function(declare, ClickPopupHandler, query, dom_class, lang, domConstruct, domAttr, On) {
	return declare(ClickPopupHandler, {
		constructor: function() {
			
		},
		
		init: function(triggerNode, customObject) {
			this.triggerNode = triggerNode;
			this.item_id = customObject.iid;
			this.module = "mailtogroup";
			
			this.features = [];
			
			// register click for node
			this.registerPopupClick();
		},
		
		setupSpecific: function() {
		},
		
		onPopupSubmit: function(customObject) {
			// setup data to send via ajax
			var search = {
				tabs: [
				    {}
				],
				nodeLists: [
				    { query: query("input[name='form_data[subject]']", this.contentNode)},
				    { query: query("textarea[name='form_data[mailcontent]']", this.contentNode)},
				    { query: query("input[name='form_data[groups]']", this.contentNode), group: "groups"},
				    { query: query("input[name='form_data[copytosender]']", this.contentNode)}
				]
			};
			
			this.submit(search);
		},
		
		onPopupSubmitSuccess: function(item_id) {
			this.close();
		},
	});
});