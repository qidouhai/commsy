//>>built
define("commsy/popups/ClickUserContextJoinPopup","dojo/_base/declare,commsy/ClickPopupHandler,dojo/query,dojo/dom-class,dojo/_base/lang,dojo/dom-construct,dojo/dom-attr,dojo/on".split(","),function(c,d,e){return c(d,{constructor:function(){},init:function(a,b){this.triggerNode=a;this.item_id=b.iid;this.user_id=b.user_id;this.content_id=b.context_id;this.action=b.action;this.description_user=b.description_user;this.module="userContextJoin";this.features=[];this.registerPopupClick()},setupSpecific:function(){},
onPopupSubmit:function(a){var b=a.part,c=a.user_id,d=a.context_id,f=a.action,a=a.description_user;this.submit({tabs:[],nodeLists:[{query:e("textarea[name='form_data[description_user]']",this.contentNode)},{query:e("input[name='form_data[code]']",this.contentNode)}]},{part:b,user_id:c,context_id:d,action:f,description_user:a})},onPopupSubmitSuccess:function(a){location.href="commsy.php?cid="+a+"&mod=project&fct=index"},onPopupSubmitError:function(){require(["dojo/dom-style","dojo/query","dojo/NodeList-dom"],
function(a){a.set("error_wrong_code","display","block")})}})});