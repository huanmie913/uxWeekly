/*
 * to: 文字列表hover改变背景颜色
 * time : 2012-03-27
 * author :QF
*/
/*
 @ id        : 列表ID
 @ hoverClass: hover的样式
 @ target    : 目标对象
*/

/*function SwitchHover(ctg){
	this.opt = {
		        _id : ctg.id, 
		_hoverClass : ctg.hoverClass,
		    _target : ctg.target
	}
	if( !( this instanceof SwitchHover)){
		return new SwitchHover(ctg);
	}
	this.doHover();
}
SwitchHover.prototype = {
	Q : function(id){
		return typeof id == "string" ? document.getElementById(id) : id;
	},
	on : function(obj,type,fn){
		if( obj.addEventListener ){
			obj.addEventListener(type,fn,false);
		}else if( obj.attachEvent ){
			obj.attachEvent("on"+type,fn);
		}else{
			obj["on"+type]=fn;
		}
	},
	doHover : function(){
		var that = this,
			_id = that.opt._id,
			_targetArray = that.Q(_id).getElementsByTagName( that.opt._target );
		for( var i = 0,_len =_targetArray.length;i<_len;i++){
			that.on(_targetArray[i],"mouseover",function(){
				this.className = that.opt._hoverClass;
			})
			that.on(_targetArray[i],"mouseout",function(){
				this.className = "";
			})
		}
	}
}*/
(function(win,doc){
	function extend(destination,resourece){
		for( var prop in resourece){
			destination[prop] = resourece[prop];
		}
		return destination;
	}
	
	function listEffection(ctg){
		this.setting = {
					id           : "js_textList",
				    tag          : "tr",
					currentClass : "hover",
					originClass  : {
										oddClass : "odd",
										evenClass: "even"
									} //odd : 奇行  even :偶行
		}
		this._opt = extend( this.setting,ctg || {});
		if( !(this instanceof listEffection)){
			return new listEffection(ctg);
		}
	}
	listEffection.prototype = {
		Q : function(id){
			return typeof id == "string" ? document.getElementById(id) : id;
		},
		on : function(obj,type,fn){
			if( obj.addEventListener ){
				obj.addEventListener(type,fn,false);
			}else if( obj.attachEvent ){
				obj.attachEvent("on"+type,fn);
			}else{
				obj["on"+type]=fn;
			}
		},
		interlacedColor : function(){
			var self = this,
			   _list = self.Q( self._opt.id ).getElementsByTagName( self._opt.tag ),
			   _len = _list.length;
			for( var i = _len-1; i>=0; i-- ){
				if( i%2 ==0 ){
					_list[i].className = self._opt.originClass.evenClass;
				}else{
					_list[i].className = self._opt.originClass.oddClass;
				}
			}
			return self;
		},
		eventColor : function(){
			var self = this,
			   _list = self.Q( self._opt.id ).getElementsByTagName( self._opt.tag ),
			   _len = _list.length;
			for( var i = 0;i<_len;i++){
				that.on(_list[i],"mouseover",function(){
					this.className = that._opt.currentClass;
				})
				that.on(_list[i],"mouseout",function(){
					this.className = "";
				})
			}
		}
		return self;
	}
	win.listEffection = listEffection;
})(window,document);