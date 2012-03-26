/**
  * to:FocuSlide
  * author:f2er
  * time:12-03-27
**/

/*FocuSlide*/
function FocuSlide(){
	this.opt = {
	  _slideContainer : "js_tabslide",
		     _imgList : "js_imgList",
		     _numList : "js_num",
		   _numTarget : "li",
		   _eventType : "click",
		_currentClass : "current",
			_autoPlay : true,
		_intervalTime : 2000,
		         _num : 0
	};
	this._timer = null;
	this._autoTimer = null;
	if( !(this instanceof FocuSlide)){
		return new FocuSlide();
	}
	this.Focus();
}
FocuSlide.prototype = {
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
	clearTimer : function( timer ){
		var that = this;
		if( timer ){
			clearInterval( timer );
			timer = null;
		}
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
			_opacity += 10;
			obj.style.opacity = _opacity/100;
			obj.style.filter = "alpha(opacity="+_opacity+")";
			if(_opacity >= 100){
				that.clearTimer( that._timer );
				_opacity = 0;
			}
		}
		that.clearTimer( that._timer );
		that._timer = setInterval(showImg,100);
	},
	showSlide : function(n){
		var that = this,
			_numList = that.Q(that.opt._numList).getElementsByTagName(that.opt._numTarget),
			_imgList = that.Q(that.opt._imgList).getElementsByTagName(that.opt._numTarget);
		for( var i = 0,_length =_numList.length;i<_length;i++ ){
				_numList[i].className = (i == n ) ? that.opt._currentClass : "";
			}
		for( var j = 0,_len = _imgList.length;j<_len;j++){
			if( j == n ){
				that.animateShow(_imgList[j]);
			}else{
				_imgList[j].style.opacity = 0;
				_imgList[j].style.filter = "alpha(opacity=0)";
			}
		}
	},
	autoSlide : function(){
		var that = this,
			_Length = that.Q(that.opt._numList).getElementsByTagName(that.opt._numTarget).length;
		that.clearTimer( that._autoTimer );
		that._autoTimer = setInterval(function(){
			if( that.opt._num >= _Length-1 ){
				that.opt._num = 0;
			}else{
				that.opt._num++;
			}
			that.showSlide(that.opt._num);
		},that.opt._intervalTime);
	},
	Initialization : function(i){
		var that = this,
			_numList = that.Q(that.opt._numList).getElementsByTagName(that.opt._numTarget),
			_imgList = that.Q(that.opt._imgList).getElementsByTagName(that.opt._numTarget);
			_numList[i].className = that.opt._currentClass;
			_imgList[i].style.opacity = 1;
			_imgList[i].style.filter = "alpha(opacity=100)";
	},
	Focus : function(){
		var that = this;
		that.Initialization( that.opt._num );	
		if( that.opt._autoPlay ){
			that.autoSlide();
		}
		that.on( that.Q(that.opt._numList ),that.opt._eventType,function(e){
			var _target = that.getTarget(e);
			if( _target.nodeName.toLowerCase() != that.opt._numTarget ){
				return;
			}
			var _index = that.index(_target);
			that.opt._num = _index;
			that.showSlide(_index);
		});
		that.on( that.Q(that.opt._slideContainer ),"mouseover",function(e){
			that.clearTimer( that._autoTimer );
		});

		that.on( that.Q(that.opt._slideContainer ),"mouseout",function(e){
			that.autoSlide();
		});
	}
}