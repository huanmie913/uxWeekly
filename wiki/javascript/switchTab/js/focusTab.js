/**
  * to:Focuslide
  * author:f2er
  * time:12-03-27
**/

/*Focuslide*/
function Focuslide(){
	this.opt = {
		_imgList : "js_imgList",
		_numList : "js_num",
		_numTarget : "li",
		//_num : 0,
		_eventType : "click",
		_currentClass : "current"
	};
	this._timer = null;
	if( !(this instanceof Focuslide)){
		return new Focuslide();
	}
	this.Focus();
}
Focuslide.prototype = {
	Q : function(id){
		return typeof id =="string" ? document.getElementById(id) : id;
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
	clearTimer : function(){
		var that = this;
		if( that._timer ){
			clearInterval( that._timer );
		}
		that._timer = null;
	},
	getTarget : function(event){
		var _e = event || window.event;
		return _e.target || _e.srcElement;
	},
	index : function(obj){
		var that = this;
		var _numTargetArray = that.Q( that.opt._numList ).getElementsByTagName( that.opt._numTarget );
		for( var i = 0,_len =_numTargetArray.length ;i<_len;i++){
			if( obj==_numTargetArray[i] ){
				return i;
			}
		}
	},
	animateShow : function(obj){
		var that = this,
			_opacity = 0;
		function showImg(){
			_opacity +=10;
			obj.style.opacity = _opacity/100;
			obj.style.filter = "alpha(opacity="+_opacity+")";
			if(_opacity>=100){
				that.clearTimer();
				_opacity = 0;
			}
		}
		that.clearTimer();
		that._timer = setInterval(showImg,100)
	},
	Focus : function(){
		var that = this,
			_numList = that.Q(that.opt._numList).getElementsByTagName(that.opt._numTarget),
			_imgList = that.Q(that.opt._imgList).getElementsByTagName(that.opt._numTarget);
			
		that.on( that.Q(that.opt._numList),that.opt._eventType,function(e){
			var _target = that.getTarget(e);
			if( _target.nodeName.toLowerCase() != that.opt._numTarget ){
				return;
			}
			var _index = that.index(_target);
			for( var i = 0,_len =_numList.length;i<_len;i++ ){
				_numList[i].className = (i == _index ) ? that.opt._currentClass : ""
			}
			for( var j = 0,_len = _imgList.length;j<_len;j++){
				if( j==_index ){
					that.animateShow(_imgList[j]);
				}else{
					_imgList[j].style.opacity = 0;
					_imgList[j].style.filter = "alpha(opacity=0)";
				}
			}
		})
	}
}