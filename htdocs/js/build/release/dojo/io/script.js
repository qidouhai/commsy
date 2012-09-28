//>>built
define("dojo/io/script","../_base/connect,../_base/kernel,../_base/lang,../sniff,../_base/window,../_base/xhr,../dom,../dom-construct,../request/script".split(","),function(j,g,i,k,l,h,m,n,f){dojo.deprecated("dojo/io/script","Use dojo/request/script.","2.0");var e={get:function(a){var c,d=this._makeScriptDeferred(a,function(){c&&c.cancel()}),b=d.ioArgs;h._ioAddQueryToUrl(b);h._ioNotifyStart(d);c=f.get(b.url,{timeout:a.timeout,jsonp:b.jsonp,checkString:a.checkString,ioArgs:b,frameDoc:a.frameDoc,canAttach:function(a){b.requestId=
a.id;b.scriptId=a.scriptId;b.canDelete=a.canDelete;return e._canAttach(b)}},!0);c.then(function(){d.resolve(d)}).otherwise(function(a){d.ioArgs.error=a;d.reject(a)});return d},attach:f._attach,remove:f._remove,_makeScriptDeferred:function(a,c){var d=h._ioSetArgs(a,c||this._deferredCancel,this._deferredOk,this._deferredError),b=d.ioArgs;b.id=g._scopeName+"IoScript"+this._counter++;b.canDelete=!1;b.jsonp=a.callbackParamName||a.jsonp;if(b.jsonp)b.query=b.query||"",0<b.query.length&&(b.query+="&"),b.query+=
b.jsonp+"="+(a.frameDoc?"parent.":"")+g._scopeName+".io.script.jsonp_"+b.id+"._jsonpCallback",b.frameDoc=a.frameDoc,b.canDelete=!0,d._jsonpCallback=this._jsonpCallback,this["jsonp_"+b.id]=d;return d},_deferredCancel:function(a){a.canceled=!0},_deferredOk:function(a){a=a.ioArgs;return a.json||a.scriptLoaded||a},_deferredError:function(a){return a},_deadScripts:[],_counter:1,_addDeadScript:function(a){e._deadScripts.push({id:a.id,frameDoc:a.frameDoc});a.frameDoc=null},_validCheck:function(){var a=e._deadScripts;
if(a&&0<a.length){for(var c=0;c<a.length;c++)e.remove(a[c].id,a[c].frameDoc),a[c].frameDoc=null;e._deadScripts=[]}return!0},_ioCheck:function(a){a=a.ioArgs;return a.json||a.scriptLoaded&&!a.args.checkString?!0:(a=a.args.checkString)&&eval("typeof("+a+") != 'undefined'")},_resHandle:function(a){e._ioCheck(a)?a.callback(a):a.errback(Error("inconceivable dojo.io.script._resHandle error"))},_canAttach:function(){return!0},_jsonpCallback:function(a){this.ioArgs.json=a;g.global[f._callbacksProperty][this.ioArgs.requestId](a)}};
i.setObject("dojo.io.script",e);return e});