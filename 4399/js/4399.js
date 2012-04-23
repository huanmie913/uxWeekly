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
	},
	extend : function(destination,resource){
		for( var pro in resource ){
			destination[pro] = resource[pro];
		}
		return destination;
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
  * QScroll(图片左右无缝滚动，有缝滚动)
 **/
function QScroll(o){
	this._ctg = {
    	container   : "js_weblist",
    	subcontainer: "js_ul",
    	item        : "li",
    	eventType   : "click",
		btn         : {
						leftBtn     : "btn_wgleft",
						rightBtn    : "btn_wgright",
						disableClass: "_disable"
					},
    	marginOffset : 14,
    	step        : 1, //每次滚动step个
    	circle      : false, //true:有缝  false:无缝
    	autoScroll  : false, //是否自动滚动
    	direction   : ""
    };
	this.opts = YJ.extend(this._ctg,o || {});
    this._var = {
    	_subId : null,
    	_conId : null,
    	_firstChild : null
    }
   this.timer = this.autoLTimer =this.autoRTimer = null;
    if( !(this instanceof QScroll )){
    	return new QScroll(o);
    }
    this.init();
}
QScroll.prototype = {
	constructor : QScroll,
	clearTimer : function(timer){
		var self = this;
		if( timer ){
			clearInterval(timer);
			timer = null;
		}
	},
	leftEvent : function(){
		var self = this;
		if( self.opts.btn != null ){
			var _LBtn = YJ.getid("js_"+self.opts.btn.leftBtn);
			if( self.opts.eventType == "mouseover" ){
				YJ.on( _LBtn,"mouseover",function(){
					self.autoPlay().left();
				});
				YJ.on( _LBtn,"mouseout",function(){
					self.clearTimer(self.autoLTimer);
				});
				
			}else{
				YJ.on( _LBtn,self.opts.eventType,function(){
					self.scrollLeft();
				});
			}
		}else{
			self.autoPlay().left();
		}
	},
	rightEvent : function(){
		var self = this;
		if( self.opts.btn != null ){
			var _RBtn = YJ.getid("js_"+self.opts.btn.rightBtn);
			if( self.opts.eventType == "mouseover" ){
				YJ.on( _RBtn,"mouseover",function(){
					self.autoPlay().right();
				});
				YJ.on( _RBtn,"mouseout",function(){
					self.clearTimer(self.autoRTimer);
				});
			}else{
				YJ.on( _RBtn,self.opts.eventType,function(){
					self.scrollRight();
				});
			}
		}else{
			self.autoPlay().right();
		}
	},
	Move : function(iT,callback){
		var self = this;
		self.clearTimer(self.timer);
		self.timer = setInterval(function (){
			var iS = (iT - self._var._subId.offsetLeft) / 5;
			iS = iS > 0 ? Math.ceil(iS) : Math.floor(iS);
			self._var._subId.offsetLeft == iT ? ( self.clearTimer(self.timer), callback && callback.apply(self)) : self._var._subId.style.left = iS + self._var._subId.offsetLeft + "px";
		}, 30);
	},
	scrollLeft : function(){
		var self = this;
		if( self.opts.circle){
			self._var._subId.insertBefore( self._var._subId.children[self._var._subId.children.length-1],self._var._subId.children[0]);
			self._var._subId.style.left = -(self._var._firstChild.offsetWidth+self.opts.marginOffset) +"px";
			self.Move(0);
		}else{
			if( self._var._subId.offsetLeft < 0 ){
				self.Move( self._var._subId.offsetLeft + self._var._firstChild.offsetWidth + self.opts.marginOffset);
			}
		}
	},
	scrollRight : function(){
		var self = this;
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
	},
	autoPlay : function(){
		var self = this;
		function autoLPleft(){
			self.clearTimer(self.autoLTimer);
			self.autoLTimer = setInterval(function(){
				self.scrollLeft();
			},600);
		}
		function autoRPlay(){
			self.clearTimer(self.autoRTimer);
			self.autoRTimer = setInterval(function(){
				self.scrollRight();
			},600);
		}
		return {
			left : autoLPleft,
			right : autoRPlay
		}
	},
	dirPlay : function(direction){
		var self = this;
		switch( self.opts.direction ){
			case "left":
				self.leftEvent();
				break;
			case "right":
				self.rightEvent();
				break;
			case "top":
				self.topEvent();
				break;
			case "bottom":
				self.bottomEvent();
				break;
			case "left-right":
				self.leftEvent();
				self.rightEvent();
				break;
			case "top-bottom":
				self.topEvent();
				self.bottomEvent();
		}
	},
	init : function(){
		var self = this,_node = YJ.clearBlank( self.opts.subcontainer );
		self._var._subId = YJ.getid( self.opts.subcontainer),
		self._var._firstChild = self._var._subId.children[0],
		self._var._conId = YJ.getid( self.opts.container );
		self._var._subId.style.width = ( parseInt(YJ.getCssProperty(_node.children[0],"width")) + self.opts.marginOffset ) * _node.children.length+"px";
		self.dirPlay( self.opts.direction);
	}
}
