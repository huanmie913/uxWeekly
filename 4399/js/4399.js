/*
 * to:www.4399.com
 * depend:javascript
 * author :f2er
*/
var YJ = window.YJ || {};
YJ = {
    $ : function(id){
		if (!id) return null; 
		if ('string' == typeof id || id instanceof String) {
			return document.getElementById(id);
		} else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
			return id;
		}
		return null;
    },
    addEvent : function(otarget,otype,ofn){
		if( otarget.addEventListener ){
			otarget.addEventListener(otype,ofn,false);
		}else if( otarget.attachEvent ){
			otarget.attachEvent("on"+otype,function(){
				ofn.call(otarget);
			});
		}else{
			otarget["on"+otype] = ofn;
		}
	},
	removeEvent : function(otarget,otype,ofn){
		if( otarget.removeEventListener ){
			otarget.removeEventListener(otype,ofn,false);
		}else if( otarget.detachEvent ){
			otarget.detachEvent("on"+otype,function(){
				ofn.call(otarget);
			});
		}else{
			otarget["on"+otype] = null;
		}
	},
    preventDefault:function(e){
		if( e && e.preventDefault){
			e.preventDefault();
		}else{
			e.returnValue=false;	
		}	
	},
	getEvent : function(e){
		return e || winow.event;
	},
	getTarget : function(e){
		return e.target || e.srcElement;
	},
    clearBlank : function(id){
		var self = this;
		var _node = YJ.$(id),
			_nodeItems = _node.children;
        for( var i=0,_len = _nodeItems.length; i<_len; i++ ){
        	if( _nodeItems[i].nodeType !=1 ){
        		_node.removeChild(_nodeItems[i])
        	}
        }
        return _node;
	},
	getCssProperty : function(node,styleProp){
		var _node = YJ.$(node),
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
	},
	IsFunction : function(obj){
		if( Object.prototype.toString.call(obj) == "[object Function]"){
			return true;
		}else{
			return false;
		}
	},
	getOffsetTop : function(dom){
		var that = this,
			_top = 0;
		while( dom!=null ){
			_top += dom.offsetTop;
			dom = dom.offsetParent;
		}
		return _top;
	},
	hasClass : function(element,classname){
		var element = YJ.$(element);
		if(!element || !element.classname) return false;

		var classArray = YJ.trim(classname).split(/\s+/), 
			len = classArray.length;
		classname = element.classname.split(/\s+/).join(" ");
		while (len--) {
			if(!(new RegExp("(^| )" + classArray[len] + "( |\x24)")).test(classname)){
				return false;
			}
		}
		return true;
	},
	getViewHeight : function(){
		var doc = document,
			client = doc.compatMode == "BackCompat" ? doc.body : doc.documentElement;
		return client.clientHeight;
	},
	getScrollTop : function(){
		var doc = document;
		return window.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop;
	},
	trim : function(source){
		var trimer = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
		return String(source).replace(trimer, "");
	}
};

/*
 * iptId : 输入框ID
 * btnSearchSubmit ：提交按钮ID
 * formSearchForm ：表单ID
 * num ：字数个数最大值
*/

(function(win,undefined){
	function searchMode( ctg ){
	    this.setting = {
	        iptId : "js_schkey",
	        btnSearchSubmit : "js_btnsch",
	        formSearchForm : "js_search",
	        num : 4
	    }
	    this.option = YJ.extend(this.setting,ctg ||{});
		if( !(this instanceof arguments.callee)){
			return new arguments.callee(ctg);
		}
		this.init();
	}
	searchMode.prototype = {
		constructor : searchMode,
		focusBlur : function(){
			var self = this,
				_defaultValue = "",
				_target = YJ.$(self.option.iptId);
			YJ.addEvent(_target,"focus",function(){
				_defaultValue = this.defaultValue;
				if( this.value == _defaultValue ){
					this.value = "";
				}
			});
			YJ.addEvent(_target,"blur",function(){
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
				_btn = YJ.$( self.option.btnSearchSubmit );
			YJ.addEvent(_btn,'click',function(){
				var key = YJ.$( self.option.iptId ).value;
				if( self.getLen( key )  < self.option.num  || key == this.defaultValue ){
					this.focus();
					alert('关键字不能少于'+( self.option.num-1 ));
					return false;
				}
				YJ.$( self.option.formSearchForm ).submit();
			});
		},
		init : function(){
			var self = this;
			self.focusBlur();
			self.submitForm();
		}
	}
   win.searchMode = searchMode;
})(window);


/**
  * QScroll(图片左右无缝滚动，有缝滚动)
 **/
 (function(win,undefined){
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
	    if( !(this instanceof arguments.callee )){
	    	return new arguments.callee(o);
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
				var _LBtn = YJ.$("js_"+self.opts.btn.leftBtn);
				if( self.opts.eventType == "mouseover" ){
					YJ.addEvent( _LBtn,"mouseover",function(){
						self.autoPlay.left();
					});
					YJ.addEvent( _LBtn,"mouseout",function(){
						self.clearTimer(self.autoLTimer);
					});
					
				}else{
					YJ.addEvent( _LBtn,self.opts.eventType,function(){
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
				var _RBtn = YJ.$("js_"+self.opts.btn.rightBtn);
				if( self.opts.eventType == "mouseover" ){
					YJ.addEvent( _RBtn,"mouseover",function(){
						self.autoPlay.right();
					});
					YJ.addEvent( _RBtn,"mouseout",function(){
						self.clearTimer(self.autoRTimer);
					});
				}else{
					YJ.addEvent( _RBtn,self.opts.eventType,function(){
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
				});
			}else{
				if( self._var._subId.offsetLeft > -(self._var._subId.offsetWidth - self._var._conId.offsetWidth - self.opts.marginOffset) ){
					self.Move( self._var._subId.offsetLeft - self._var._firstChild.offsetWidth - self.opts.marginOffset);
				}
			}
		},
		autoPlay : (function(){
			var self = QScroll;
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
		})(),
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
				case "left-right" || "right-left":
					self.leftEvent();
					self.rightEvent();
					break;
				case "top-bottom" || "bottom-top":
					self.topEvent();
					self.bottomEvent();
			}
		},
		init : function(){
			var self = this,_node = YJ.clearBlank( self.opts.subcontainer );
			self._var._subId = YJ.$( self.opts.subcontainer),
			self._var._firstChild = self._var._subId.children[0],
			self._var._conId = YJ.$( self.opts.container );
			if( self.opts.direction == ("top" ||  "bottom" || "top-bottom" ||  "bottom-top" )){
				self._var._subId.style.height = ( parseInt(YJ.getCssProperty(_node.children[0],"height"))) * _node.children.length+"px";
			}else{
				self._var._subId.style.width = ( parseInt(YJ.getCssProperty(_node.children[0],"width")) + self.opts.marginOffset ) * _node.children.length+"px";
			}
			self.dirPlay( self.opts.direction);
		}
	}
	win.QScroll = QScroll;
 })(window);


/*
* plugIn:Switchable(Tab切换+内容延迟加载)
 * depend:js
 * author:QF
 * time: 12-05-18
*/
(function(win,undefined){
	var doc = win.document;	
	/*Switchable*/
	function Switchable(ctg){
		this.setting={
			tabid:"tab_type",
			htag:"tab-item", 
			currentClass:"cur",
			cProp : "data-widget",
			bid:"tab_ooxx", /*内容区ID*/
			btag:"tab-content", /*内容区标识*/
			dPro:"data-loaded",/*是否加载过*/
			dimgPro : "data-src",
			eventType : "click",
			tabType : 1, // 0:普通切换 1:延迟加载
			callback : false
		};
		this.GLOBAL = {
			tId : null,
			bId : null
		}
		this.option = YJ.extend(this.setting,ctg || {});
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(ctg);
		}	
		this.init();
	}
	Switchable.prototype = {
		constructor : Switchable,
		getData:function(n){
			var that = this;
			if( that.GLOBAL.bId[n].getAttribute( that.option.cProp ) != that.option.btag ){
				return;
			}
			var _tabContent = that.GLOBAL.bId[n];
			var _textarea = _tabContent.getElementsByTagName('textarea')[0];
			var _div  =document.createElement('div');
			_div.className = "sw_container";
			_div.innerHTML = _textarea.value;
			_tabContent.replaceChild(_div,_textarea);
		},
		getIndex:function(node,obj){
			var that=this;
			for( var j=0,_len=obj.length;j<_len;j++){
				if(obj[j]==node){
					return j;	
				}
			}
		},
		checkLoad : function(obj,i){
			var that = this;
			if( !obj.getAttribute(that.option.dPro) || obj.getAttribute(that.option.dPro) == "false"){
				that.getData(i);
				obj.setAttribute(that.option.dPro,'true');
			}
		},
		trigger : function(i){
			var that = this;
			for( var n=0,len = that.GLOBAL.tId.length;n<len;n++){
				that.GLOBAL.tId[n].className = (n == i) ? that.option.currentClass : "";
			}
			for( var m=0,len = that.GLOBAL.bId.length;m<len;m++){
				that.GLOBAL.bId[m].style.display = (m == i) ? "block" : "none";
			}
			if( that.option.tabType == 1){
				that.checkLoad(that.GLOBAL.tId[i],i);
			}else if(that.option.tabType == 0){
				var _imgArr = that.GLOBAL.bId[i].getElementsByTagName('img');
				for( var k=_imgArr.length-1;k>=0;k--){
                    var _img = _imgArr[k];
                    _img.setAttribute(that.option.dimgPro, _img.getAttribute('src'));
					_img.removeAttribute('src');
                }
			}
			YJ.IsFunction( that.option.callback ) && (that.option.callback)(i);
			return that;
		},
		doEvent : function(){
			var that = this;
			YJ.addEvent(YJ.$(that.option.tabid),that.option.eventType,function(e){
            	var _ev = YJ.getEvent(e),
            		_target = YJ.getTarget(_ev),
            		_element = null,
            		_index = 0;

            	//判断点击对象的ID
            	if( _target.id == that.option.tabid ){
            		return;
            	}

            	//判断当前对象的自定义属性
            	if( _target.getAttribute( that.option.cProp) != that.option.htag){
            		_element = _target.parentNode;
            	}else{
            		_element = _target;
            	}
            	_index = that.getIndex(_element,that.GLOBAL.tId);
            	that.trigger(_index);
				
				YJ.preventDefault(_ev);
            });

		},
		init:function(){
			var that = this;
			that.GLOBAL.tId = YJ.$(that.option.tabid).children;
            that.GLOBAL.bId = YJ.$(that.option.bid).children;
            that.doEvent();
			return that;
		}	
	}
	win.Switchable = Switchable;
})(window);

/**
  * to:lazyLoad.js (模块延迟加载)
  * author:QF
  * time:12-06-21
**/

(function(win,undefined){
	var doc = win.document;	
	function lazyLoad(ctg){
		this.setting={
				id : "box_1",
				cid : "",
				type : "img", // img,module
				dpro : "data-src",
				className : "",
				preloadHeight : 0,
				placeHolder : "",
				callback : function(){}
		}
		this.option = YJ.extend(this.setting,ctg||{});
		this._filling=0;
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(ctg);  
		}	
		this.init(); 
	}
	
	lazyLoad.prototype = {
		constructor : lazyLoad,
		lazyModule : function(callback){
			var that=this,
				_clientHeight = doc.documentElement.clientHeight || doc.body.clientHeight,
				_scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
				_obj = YJ.$( that.option.id ),
				_offsetTop = YJ.getOffsetTop( _obj );
				
			var _height = YJ.getCssProperty( _obj,'height');
			var _v = _offsetTop-_scrollTop;
				
			if( that._filling==1){
				return;	
			}
			if( that._filling==0){
				if(  _v >=0 && _v< _clientHeight ){
					var _cid = ( that.option.cid === "" ) ? YJ.$( that.option.id ) : QF.$( that.option.cid );
					var _textarea=_cid.getElementsByTagName('textarea')[0],
						_txtValue = _textarea.value;
					var _dv=document.createElement('div');
					_dv.className = "lc_container";
					_dv.innerHTML = _txtValue;
					_cid.replaceChild(_dv,_textarea);
					that._filling=1;
				}
			}
			YJ.IsFunction(that.option.callback)();
		},
		lazyImage : function(){
			var that = this,
				_imgArr = doc.getElementsByTagName('img'),
				_targets = _imgArr,
				_len = _imgArr.length,
				i = 0,
				viewOffset = getLoadOffset(),
				_target;
				
			if ( that.option.className) {
				_targets= [];
				for (; i < _len; ++i) {
					if (YJ.hasClass(_imgArr[i], that.option.className)) {
						_targets.push(_imgArr[i]);
					}
				}
			}
			
			function getLoadOffset(){
				return YJ.getViewHeight() + YJ.getScrollTop() + that.option.preloadHeight;
			}
			
			//加载可视图片
			for (var i = 0, len = _targets.length; i < len; ++i) {
				_target = _targets[i];
				if ( YJ.getOffsetTop(_target) > viewOffset) {
					_target.setAttribute(that.option.dpro, _target.getAttribute('src'));
					that.option.placeHolder ? _target.src = that.option.placeHolder : _target.removeAttribute('src');
				}
			}
			
			//处理延迟加载
			var doLoad = function() {
				var viewOffset = getLoadOffset(),
					imgSrc,
					finished = true,
					i = 0;
					
				for (; i < _targets.length; ++i) {
					_target = _targets[i];
					imgSrc = _target.getAttribute(that.option.dpro);
					imgSrc && (finished = false);
					if (YJ.getOffsetTop(_target) < viewOffset && imgSrc) {
						_target.setAttribute('src',imgSrc);
						_target.removeAttribute(that.option.dpro);
						YJ.IsFunction(that.option.callback) && that.option.callback(_target);
					}
				}
				//当全部图片都已经加载, 去掉事件监听
				finished && YJ.removeEvent(win, 'scroll', doLoad);
			};
			YJ.addEvent(win, 'scroll', doLoad);
		},
		init : function(){
			var that=this;
			if( that.option.type == "module"){
				that.lazyModule(that.option.callback);
				if( that._filling==0 ){
					YJ.addEvent(window,'scroll',function(){	
						that.lazyModule(that.option.callback);	
					})
				}
			}else if(that.option.type == "img"){
				that.lazyImage();
			}
		}	
	}
	win.lazyLoad = lazyLoad;
})(window);
