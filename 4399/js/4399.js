/*
 * to:www.4399.com
 * depend:javascript
 * author :f2er
*/
var YJ = window.YJ || {};
YJ = {
    getid : function(id){
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
		var _node = YJ.getid(id),
			_nodeItems = _node.children;
        for( var i=0,_len = _nodeItems.length; i<_len; i++ ){
        	if( _nodeItems[i].nodeType !=1 ){
        		_node.removeChild(_nodeItems[i])
        	}
        }
        return _node;
	},
	getCssProperty : function(node,styleProp){
		var _node = YJ.getid(node),
			_pro = "";
		if( _node.currentStyle ){
			_pro = _node.currentStyle[styleProp];
		}else if( window.getComputedStyle ){
			_pro = document.defaultView.getComputedStyle(_node,null).getPropertyValue(styleProp);
		}
		return _pro;
	}
}

/*
 * iptId : 输入框ID
 * btnSearchSubmit ：提交按钮ID
 * formSearchForm ：表单ID
 * num ：字数个数最大值
*/
function searchMode( ctg ){
    this.setting = {
        iptId : ctg.iptId,
        btnSearchSubmit : ctg.btnSearchSubmit,
        formSearchForm : ctg.formSearchForm,
        num : ctg.num
    }
	if( !(this instanceof searchMode)){
		return new searchMode(ctg);
	}
	this.init();
}
searchMode.prototype = {
	constructor : searchMode,
	focusBlur : function(){
		var self = this,
			_defaultValue = "",
			_target = YJ.getid(self.setting.iptId);
		YJ.on(_target,"focus",function(){
			_defaultValue = this.defaultValue;
			if( this.value == _defaultValue ){
				this.value = ""
			}
		});
		YJ.on(_target,"blur",function(){
			if( this.value.length == 0 ){
				this.value = _defaultValue;
			}
		});
	},
	getLen : function (str) {
		str = str.replace(/(^\s*)|(\s*$)/g, "");
		var aMatch=str.match(/[^\x00-\x80]/g);
		return (str.length+(!aMatch?0:aMatch.length));
	},
	submitForm : function(){
		var self = this,
			_btn = YJ.getid( self.setting.btnSearchSubmit );
		YJ.on(_btn,'click',function(){
			var key = self.getid( self.setting.iptId ).value;
			if( self.getLen( key )  < self.setting.num  || key == this.defaultValue ){
				this.focus();
				alert('关键字不能少于'+( self.setting.num-1 ));
				return false;
			}
			YJ.getid( self.setting.formSearchForm ).submit();
		});
	},
	init : function(){
		var self = this;
		self.focusBlur();
		self.submitForm();
	}
}

/**
  * ImgScroll(图片左右无缝滚动，有缝滚动)
 **/
function ImgScroll(){
    this.opts = {
    	container   : "js_weblist",
    	subcontainer: "js_ul",
    	item        : "li",
		btn         : {
						leftBtn     : "btn_wgleft",
						rightBtn    : "btn_wgright",
						disableClass: "_disable"
					},
    	marginOffset : 14,
    	step        : 1, //每次滚动step个
    	circle      : false //true:有缝  false:无缝

    };
    this._var = {
    	_subId : null,
    	_conId : null,
    	_firstChild : null
    }
    this.timer = null;
    if( !(this instanceof ImgScroll )){
    	return new ImgScroll();
    }
    this.init();
}
ImgScroll.prototype = {
	constructor : ImgScroll,
	leftEvent : function(){
		var self = this;
		YJ.on( YJ.getid("js_"+self.opts.btn.leftBtn),"click",function(){
			if( self.opts.circle){
				self._var._subId.insertBefore( self._var._subId.children[self._var._subId.children.length-1],self._var._subId.children[0]);
				self._var._subId.style.left = -(self._var._firstChild.offsetWidth+self.opts.marginOffset) +"px";
				self.Move(0);
			}else{
				if( self._var._subId.offsetLeft < 0 ){
					self.Move( self._var._subId.offsetLeft + self._var._firstChild.offsetWidth + self.opts.marginOffset);
				}
			}
		});
	},
	rightEvent : function(){
		var self = this;
		YJ.on( YJ.getid("js_"+self.opts.btn.rightBtn),"click",function(){
			if( self.opts.circle){
				self.Move( -self._var._firstChild.offsetWidth - self.opts.marginOffset,function(){
					self._var._subId.appendChild(self._var._subId.children[0]);
					self._var._subId.style.left = 0;
				})
			}else{
				if( self._var._subId.offsetLeft > -(self._var._subId.offsetWidth - self._var._conId.offsetWidth - self.opts.marginOffset) ){
					self.Move( self._var._subId.offsetLeft - self._var._firstChild.offsetWidth - self.opts.marginOffset);
				}
			}
		});
	},
	Move : function(iT,callback){
		var self = this;
		clearInterval(self.timer)
		self.timer = setInterval(function (){
			var iS = (iT - self._var._subId.offsetLeft) / 5;
			iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);
			self._var._subId.offsetLeft == iT ? (clearInterval(self.timer), callback && callback.apply(self)) : self._var._subId.style.left = iS + self._var._subId.offsetLeft + "px";
		}, 30);
	},
	init : function(){
		var self = this,_node = YJ.clearBlank( self.opts.subcontainer );
		self._var._subId = YJ.getid( self.opts.subcontainer),
		self._var._firstChild = self._var._subId.children[0],
		self._var._conId = YJ.getid( self.opts.container );
		self._var._subId.style.width = ( parseInt(YJ.getCssProperty(_node.children[0],"width")) + self.opts.marginOffset ) * _node.children.length+"px";
		self.leftEvent();
		self.rightEvent();
	}
}