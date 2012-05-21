/**
  * to:ModuleLoad.js (模块延迟加载)
  * author:QF
  * time:12-05-21
**/

(function(win,undefined){
	var doc = win.document;
	Object.prototype.extend = function(desction,source){
		for( var prop in source ){
			if( source.hasOwnProperty(prop) ){
				desction[prop] = source[prop];
			}
		}
		return desction;
	}
	var QF = QF || {};
	QF = {
		$ : function(id){
			return ( typeof id == "string" ) ? doc.getElementById(id) : id;
		},
		getStyle:function(ele,pro){
			var _ele = ele;
			var _style = ele.currentStyle || document.defaultView.getComputedStyle(ele,null);
			var _value = _style[pro];
			return _value;
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
		IsFunction : function(obj){
			if( Object.prototype.toString.call(obj) == "[object Function]"){
				(obj)();
			}
		}
	}
	
	function ModuleLoad(ctg){
		this.setting={
				id : "box_1",
				cid : "box_1c",
				callback : function(){}
		}
		this.option = Object.extend(this.setting,ctg||{});
		this._filling=0;
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(ctg);  
		}	
		this.init(); 
	}
	
	ModuleLoad.prototype = {
		constructor : ModuleLoad,
		GetPosTop:function(){
			var that = this,
				_obj = QF.$(that.option.id),
				_top = 0;
			while( _obj ){
				_top += _obj.offsetTop;
				_obj = _obj.offsetParent;
			}
			return _top;
		},
		lazyContent:function(callback){
			var that=this,
				_clientHeight = doc.documentElement.clientHeight || doc.body.clientHeight,
				_scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop,
				_offsetTop = that.GetPosTop( that.option.id ),
				_obj = QF.$( that.option.id );
				var _height = QF.getStyle( _obj,'height');
				var _v = _offsetTop-_scrollTop;
				
				if( that._filling==1){
					return;	
				}
				if( that._filling==0){
					if(  _v >=0 && _v< _clientHeight ){
						var _cid = ( that.option.cid === " " ) ? QF.$( that.option.id ) : QF.$( that.option.cid );
						var _textarea=_cid.getElementsByTagName('textarea')[0].value;
						var _dv=document.createElement('div');
						_dv.innerHTML=_textarea;
						_cid.appendChild(_dv);
						that._filling=1;
					}
				}
				QF.IsFunction(that.option.callback);
			},
			init:function(){
				var that=this;
					that.lazyContent(that.option.callback);
				if( that._filling==0 ){
					QF.addEvent(window,'scroll',function(){	
						that.lazyContent(that.option.callback);	
					})
				}
			}	
		}
		win.ModuleLoad = ModuleLoad;
})(window);


