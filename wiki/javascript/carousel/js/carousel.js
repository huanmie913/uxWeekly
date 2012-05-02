/**
  * to:carousel
  * author:f2er
  * time:12-03-27
**/

/*carousel*/
(function(win,doc){
	var YJ = win.YJ || {};
	YJ = {
		extend : function(destination,source){
			for( var prop in source ){
				destination[prop] = source[prop];
			}
			return destination;
		},
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
		getTarget : function(event){
			var _e = event || window.event;
			return _e.target || _e.srcElement;
		}
	}
	
	function FocusCarousel(ctg){
		this.opt = {
				  slideContainer : "js_tabslide",
						 imgList : "js_imgList",
						 numList : "js_num",
					   numTarget : "li",
					   eventType : "click",
					currentClass : "current",
							 Btn : {
									left : "js_leftBtn",
									right : "js_rightBtn",
									leftClass : "leftBtn",
									rightClass : "rightBtn",
									btnDisable : "_disable"
								},
						autoPlay : false,
					intervalTime : 2000,
							 num : 0
				};
		this.setting = YJ.extend(this.opt,ctg || {});
		this._timer = null;
		this._autoTimer = null;
		if( !(this instanceof FocusCarousel)){
			return new FocusCarousel(ctg);
		}
		this.init();
	}
	
	FocusCarousel.prototype = {
		varArray : function(){
			var that = this;
			var _numList = YJ.Q( that.setting.numList ).getElementsByTagName( that.setting.numTarget ),
				_imgList = YJ.Q( that.setting.imgList ).getElementsByTagName(that.setting.numTarget);
			return{
				_numList : _numList,
				_imgList : _imgList
			}
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
		clearTimer : function( timer ){
			var that = this;
			if( timer ){
				clearInterval( timer );
				timer = null;
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
			if( Object.prototype.toString.call(that.setting.Btn) == "[object Object]" ){
				
				var _leftBtn = YJ.Q( that.setting.Btn.left ),
					_rightBtn = YJ.Q( that.setting.Btn.right ),
					_leftBtnClass = that.setting.Btn.leftClass,
					_rightBtnClass = that.setting.Btn.rightClass;

				if( that.setting.num >= _numList.length -1 ){
					_leftBtn.className = _leftBtnClass;
					_rightBtn.className = _rightBtnClass + that.setting.Btn.btnDisable;
				}else if( that.setting.num < _numList.length -1 && that.setting.num >0 ){
					_rightBtn.className = _rightBtnClass;
					_leftBtn.className = _leftBtnClass;
				}else if( that.setting.num <= 0 ){
					_rightBtn.className = _rightBtnClass;
					_leftBtn.className = _leftBtnClass + that.setting.Btn.btnDisable;
				}
			}
		},
		showSlide : function(n){
			var that = this,
				_numList = that.varArray()._numList,
				_imgList = that.varArray()._imgList;
			for( var i = 0,_length =_numList.length;i<_length;i++ ){
					_numList[i].className = (i == n ) ? that.setting.currentClass : "";
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
				if( that.setting.num >= _Length-1 ){
					that.setting.num = 0;
				}else{
					that.setting.num++;
				}
				that.showSlide(that.setting.num);
			},that.setting.intervalTime);
		},
		Initialization : function(i){
			var that = this,
				_numList = that.varArray()._numList,
				_imgList = that.varArray()._imgList;
			_numList[i].className = that.setting.currentClass;
			that.setOpacity(_imgList[i],100);
			that.BtnState();
		},
		rightEvent : function(lobj,robj){
			var that = this,
				_length = that.varArray()._numList.length;
				that.setting.num++;
				if( that.setting.num > _length-1 ){
					that.setting.num = _length-1;
					return;
				}
				lobj.className = that.setting.Btn.leftClass;
				that.showSlide( that.setting.num );
		},
		leftEvent : function(lobj,robj){
			var that = this;
			that.setting.num--;
			if( that.setting.num < 0 ){
				that.setting.num = 0;
				return;
			}
			robj.className = that.setting.Btn.rightClass;
			that.showSlide( that.setting.num );
		},
		init : function(){
			var that = this,
				_slideContainer = YJ.Q(that.setting.slideContainer);
			if( Object.prototype.toString.call(that.setting.Btn) == "[object Object]" ){
				var _leftBtn = YJ.Q( that.setting.Btn.left ),
					_rightBtn = YJ.Q( that.setting.Btn.right );
				YJ.on( _leftBtn, that.setting.eventType,function(){
					that.leftEvent(_leftBtn,_rightBtn);
				});
				YJ.on( _rightBtn, that.setting.eventType,function(){
					that.rightEvent(_leftBtn,_rightBtn);
				});
			}
			that.Initialization( that.setting.num );	
			if( that.setting.autoPlay ){
				that.autoSlide();
				YJ.on( _slideContainer ,"mouseover",function(e){
					that.clearTimer( that._autoTimer );
				});

				YJ.on( _slideContainer ,"mouseout",function(e){
					that.autoSlide();
				});
			}
			YJ.on( YJ.Q(that.setting.numList ),that.setting.eventType,function(e){
				var _target = YJ.getTarget(e);
				if( _target.nodeName.toLowerCase() != that.setting.numTarget ){
					return;
				}
				var _index = that.index(_target);
				that.setting.num = _index;
				that.showSlide(_index);
			});
		}
	}
	win.FocusCarousel = FocusCarousel;
})(window,document);