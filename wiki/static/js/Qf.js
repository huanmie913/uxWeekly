/*
 * to:www.4399.com
 * depend:javascript
 * author :f2er(Qf)
*/
var Qf = window.Qf || {};
Qf = {
    _$ : function(id){
        return typeof id == "string" ? document.getElementById(id) : id;
    },
    on : function( otarget,otype,fn ){
    	if( otarget.addEventListener ){
    		otarget.addEventListener( otype,fn,false);
    	}else if( otarget.attachEvent ){
    		otarget.attachEvent("on"+otype,fn);
    	}else{
    		otarget["on"+otype]=fn;
    	}
    },
    clearBlank : function(id){
		var self = this;
		var _node = Qf._$(id),
			_nodeItems = _node.children;
        for( var i=0,_len = _nodeItems.length; i<_len; i++ ){
        	if( _nodeItems[i].nodeType !=1 ){
        		_node.removeChild(_nodeItems[i])
        	}
        }
        return _node;
	},
	getCssProperty : function(node,styleProp){
		var _node = Qf._$(node),
			_pro = "";
		if( _node.currentStyle ){
			_pro = _node.currentStyle[styleProp];
		}else if( window.getComputedStyle ){
			_pro = document.defaultView.getComputedStyle(_node,null).getPropertyValue(styleProp);
		}
		return _pro;
	}
}
