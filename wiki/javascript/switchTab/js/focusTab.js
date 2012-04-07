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
			     _Btn : {
			 			_left : "js_leftBtn",
			 			_right : "js_rightBtn",
			 			_leftClass : "leftBtn",
			 			_rightClass : "rightBtn",
			 			_btnDisable : "_disable"
			 		},
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
	varArray : function(){
		var that = this;
		var _numList = that.Q( that.opt._numList ).getElementsByTagName( that.opt._numTarget ),
			_imgList = that.Q(that.opt._imgList).getElementsByTagName(that.opt._numTarget);
		return{
			_numList : _numList,
			_imgList : _imgList
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
		var _numList = that.varArray()._numList;
		for( var i = 0,_len = _numList.length ;i<_len;i++){
			if( obj == _numList[i] ){
				return i;
			}
		}
	},
	setOpacity : function(obj,opacityValue){
		obj.style.opacity = opacityValue/100;
		obj.style.filter = "alpha(opacity="+opacityValue+")";
	},
	animateShow : function(obj){
		var that = this,
			_opacity = 0;
		function showImg(){
			_opacity += 10;
			that.setOpacity(obj,_opacity);
			if(_opacity >= 100){
				that.clearTimer( that._timer );
				_opacity = 0;
			}
		}
		that.clearTimer( that._timer );
		that._timer = setInterval(showImg,100);
	},
	BtnState : function(){
		var that = this,
			_numList = that.varArray()._numList,
			_imgList = that.varArray()._imgList;
		if( Object.prototype.toString.call(that.opt._Btn) == "[object Object]" ){
			var _leftBtn = that.Q( that.opt._Btn._left ),
				_rightBtn = that.Q( that.opt._Btn._right ),
				_leftBtnClass = that.opt._Btn._leftClass,
				_rightBtnClass = that.opt._Btn._rightClass;

			if( that.opt._num >= _numList.length -1 ){
				_leftBtn.className = _leftBtnClass;
				_rightBtn.className = _rightBtnClass + that.opt._Btn._btnDisable;
			}else if( that.opt._num < _numList.length -1 && that.opt._num >0 ){
				_rightBtn.className = _rightBtnClass;
				_leftBtn.className = _leftBtnClass;
			}else if( that.opt._num <= 0 ){
				_rightBtn.className = _rightBtnClass;
				_leftBtn.className = _leftBtnClass + that.opt._Btn._btnDisable;
			}
		}
	},
	showSlide : function(n){
		var that = this,
			_numList = that.varArray()._numList,
			_imgList = that.varArray()._imgList;
		for( var i = 0,_length =_numList.length;i<_length;i++ ){
				_numList[i].className = (i == n ) ? that.opt._currentClass : "";
			}
		for( var j = 0,_len = _imgList.length;j<_len;j++){
			if( j == n ){
				that.animateShow(_imgList[j]);
			}else{
				that.setOpacity(_imgList[j],0);
			}
		}

		that.BtnState();
		
	},
	autoSlide : function(){
		var that = this,
			_Length = that.varArray()._numList.length;
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
			_numList = that.varArray()._numList,
			_imgList = that.varArray()._imgList;
		_numList[i].className = that.opt._currentClass;
		that.setOpacity(_imgList[i],100);
		that.BtnState();
	},
	rightEvent : function(lobj,robj){
		var that = this,
			_length = that.varArray()._numList.length;
			that.opt._num++;
			if( that.opt._num > _length-1 ){
				that.opt._num = _length-1;
				return;
			}
			lobj.className = that.opt._Btn._leftClass;
			that.showSlide( that.opt._num );
	},
	leftEvent : function(lobj,robj){
		var that = this;
		that.opt._num--;
		if( that.opt._num < 0 ){
			that.opt._num = 0;
			return;
		}
		robj.className = that.opt._Btn._rightClass;
		that.showSlide( that.opt._num );
	},
	Focus : function(){
		var that = this,
			_slideContainer = that.Q(that.opt._slideContainer);
		if( Object.prototype.toString.call(that.opt._Btn) == "[object Object]" ){
			var _leftBtn = that.Q( that.opt._Btn._left ),
				_rightBtn = that.Q( that.opt._Btn._right );

			that.on( _leftBtn, that.opt._eventType,function(){
				that.leftEvent(_leftBtn,_rightBtn);
			});
			that.on( _rightBtn, that.opt._eventType,function(){
				that.rightEvent(_leftBtn,_rightBtn);
			});
		}
		
		that.Initialization( that.opt._num );	
		
		if( that.opt._autoPlay ){
			that.autoSlide();
			that.on( _slideContainer ,"mouseover",function(e){
				that.clearTimer( that._autoTimer );
			});

			that.on( _slideContainer ,"mouseout",function(e){
				that.autoSlide();
			});
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
	}
}