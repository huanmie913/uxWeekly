/*
 * to: 文字列表hover改变背景颜色
 * time : 2012-03-27
 * author :QF
*/

function SwitchHover(){
	this.opt = {
		        _id : "js_textList",
		_hoverClass : "hover",
		   _target : "tr"
	}
	if( !( this instanceof SwitchHover)){
		return new SwitchHover();
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
}