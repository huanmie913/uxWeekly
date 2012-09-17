/**
  * to:carousel
  * author:f2er
  * time:12-03-27
  * update : 12-05-02
**/

/*carousel*/
(function(win,undefined){
	
    /*public method YJ*/
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
				obj.attachEvent("on"+type,function(){
					fn.call(obj);
				});
			}else{
				obj["on"+type]=fn;
			}
		},
		getTarget : function(event){
			var _e = event || window.event;
			return _e.target || _e.srcElement;
		},
		clearBlank : function(obj){
			for( var i = 0,len = obj.children.length;i<len;i++){
				if( obj.children[i].nodeType != 1){
					obj.removeChild(obj.children[i]);
				}
			}
			return obj;
		},
		getCssProperty : function(element,attr){
			if(element.style[attr]){
				return element.style[attr];
			}else if(element.currentStyle){

				return element.currentStyle[attr];
			}else if(document.defaultView && document.defaultView.getComputedStyle){
				attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
				return document.defaultView.getComputedStyle(element,null).getPropertyValue(attr);
			}else{
				return null;
			}
		}
	}
	
	/*FocusCarousel*/
	function FocusCarousel(ctg){
		this.opt = {
				  slideContainer : "js_tabslide",
						 imgList : "js_imgList",
						 numList : "js_num",//js_num
					   slideTarget : "li",
					   eventType : "click",
					currentClass : "current",
							 num : 0,
						   speed : 300, 
						   step  : 24,
					      effect : {
									 efficacy : "slide", /*transparent,slide*/
									 direction : 0 
								},
							 /*Btn : null,*/
							 Btn : {
									left : "js_leftBtn",
									right : "js_rightBtn",
									leftClass : "leftBtn",
									rightClass : "rightBtn",
									btnDisable : "_disable"
								},
						autoPlay : {
									play : false,
									intervalTime : 2000
								}
							
				};
		
		this.setting = YJ.extend(this.opt,ctg || {});
		this._timer = null;
		this._autoTimer = null;
		this.LENGTH = 0; 
		this.WIDTH = this.HEIGHT = 0; 
		if( !(this instanceof FocusCarousel)){
			return new FocusCarousel(ctg);
		}
		this.init();
	}
	/* Tween */
	var Tween = {
		slide: {
				easeOut: function(t, b, c, d) {
					//return (t == d) ? b + c: c * ( - Math.pow(2, -10 * t / d) + 1) + b;
					//console.log( (t == d) ? b + c: c * (0.5 + 1) + b);
					return (t == d) ? b + c: c * (0.5 + 1) + b;
			}
		},
		transparent : {
				setOpacity : function(obj,opacityValue){
					obj.style.opacity = opacityValue/100;
					obj.style.filter = "alpha(opacity="+opacityValue+")";
					return obj;
			}
		}
	}
	FocusCarousel.prototype = {
		constructor : FocusCarousel,
		numList : function(){
			var that = this;
			var _numList = YJ.Q( that.setting.numList ) && YJ.Q( that.setting.numList ).getElementsByTagName( that.setting.slideTarget );
			return _numList;
		},
		imgList : function(){
			var that = this;
			var	_imgList = YJ.Q( that.setting.imgList ).getElementsByTagName(that.setting.slideTarget);
			return _imgList;
		},
		checkType : function(obj,callback){
			if( {}.toString.call(obj) != "[object Null]" && {}.toString.call(callback) == "[object Function]" ){
				callback && callback();
			}
		},
		index : function(obj){
			var that = this;
			var _numList = that.numList();
			for( var i = 0;i<that.LENGTH;i++){
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
		
		opacityShow : function(obj){
			var that = this,
				_opacity = 0;
			function showImg(){
				Tween.transparent.setOpacity(obj,_opacity);
				if(_opacity >= 100){
					that.clearTimer( that._timer );
				}else{
					_opacity += that.setting.step;
				}
				
			}
			that._timer = setInterval(showImg,that.setting.speed);
		},
		setSlide : function(obj,n,arg){
			var that = this;
			if( that.setting.effect.direction == 1){
				var _oW = parseInt(YJ.getCssProperty(obj,'marginLeft')),
					_nW = ( -that.WIDTH * n ) - _oW;
				obj.style.marginLeft = Math.ceil(Tween.slide.easeOut(arg, _oW, _nW, that.WIDTH ))+"px";
			}else{
				var _oH = parseInt(YJ.getCssProperty(obj,'marginTop')),
					_nH = ( -that.HEIGHT * n ) - _oH;
				obj.style.marginTop = Math.ceil(Tween.slide.easeOut(arg, _oH, _nH, that.HEIGHT ))+"px";
			}
		},
		slideShow : function(obj,n){
			var that = this,
				_width = _height = 0;
			function animate(){
				if( that.setting.effect.direction == 1 ){
					
					if( _width < that.WIDTH ){
						_width += that.setting.step;
						that.setSlide(obj,n,_width);
					}else{
						that.clearTimer( that._timer );
						//_width = 0;
					}
				}else if( that.setting.effect.direction == 0 ){
					
					if( _height < that.HEIGHT ){
						_height += that.setting.step;
						that.setSlide(obj,n,_height);
					}else{
						that.clearTimer( that._timer );
						_height = 0;
					}
				}
			}
			
			that._timer = setInterval(animate,that.setting.speed);
		},
		BtnState : function(){
			var that = this,
				_imgList = that.imgList();
			that.checkType(that.setting.numList,function(){
				var _numList = that.numList();
			});
			
			that.checkType(that.setting.Btn,function(){
				var _leftBtn = YJ.Q( that.setting.Btn.left ),
					_rightBtn = YJ.Q( that.setting.Btn.right ),
					_leftBtnClass = that.setting.Btn.leftClass,
					_rightBtnClass = that.setting.Btn.rightClass;

				if( that.setting.num >= that.LENGTH -1 ){
					_leftBtn.className = _leftBtnClass;
					_rightBtn.className = _rightBtnClass + that.setting.Btn.btnDisable;
				}else if( that.setting.num < that.LENGTH -1 && that.setting.num >0 ){
					_rightBtn.className = _rightBtnClass;
					_leftBtn.className = _leftBtnClass;
				}else if( that.setting.num <= 0 ){
					_rightBtn.className = _rightBtnClass;
					_leftBtn.className = _leftBtnClass + that.setting.Btn.btnDisable;
				}
			})
		},
		showSlide : function(n){
			var that = this,
				_imgList = that.imgList(),
				_imgContainer = YJ.Q( that.setting.imgList );
				
			that.checkType( YJ.Q( that.setting.numList ),function(){
				var _numList = that.numList();
				for( var i = 0;i< that.LENGTH; i++ ){
					_numList[i].className = (i == n ) ? that.setting.currentClass : "";
				}
			});
			if( that.setting.effect.efficacy == "transparent"){
				for( var j = 0;j<that.LENGTH;j++){
					var _obj = _imgList[j];
					if( j == n ){
						that.opacityShow(_obj);
						_obj.style.zIndex = 11;
					}else{
						Tween.transparent.setOpacity(_obj,0);
						_obj.style.zIndex = 10;
					}
				}
			}
			
			if( that.setting.effect.efficacy == "slide"){
				that.slideShow(_imgContainer,n);
			}
			that.BtnState();
		},
		autoSlide : function(){
			var that = this;
			that.clearTimer( that._autoTimer );
			that._autoTimer = setInterval(function(){
				if( that.setting.num >= that.LENGTH - 1 ){
					that.setting.num = 0;
				}else{
					that.setting.num++;
				}
				that.showSlide(that.setting.num);
			},that.setting.autoPlay.intervalTime);
		},
		Initialization : function(i){
			var that = this,
				_imgList = that.imgList(),
				_imgContainer = YJ.Q( that.setting.imgList );
			that.LENGTH = _imgContainer.children.length;
			
			that.checkType( YJ.Q(that.setting.numList),function(){
				var _numList = that.numList();
				_numList[i].className = that.setting.currentClass;
			})
			if(that.setting.effect.efficacy == "transparent"){
				Tween.transparent.setOpacity(_imgList[i],100);
			}else if(that.setting.effect.efficacy == "slide"){
				var _arg = that.setting.effect.direction ? that.WIDTH : that.HEIGHT;
				that.setSlide(_imgContainer,i,_arg);
			}
			that.BtnState();
		},
		rightEvent : function(lobj,robj){
			var that = this;
				that.setting.num++;
				if( that.setting.num > that.LENGTH - 1 ){
					that.setting.num = that.LENGTH - 1;
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
				_slideContainer = YJ.Q(that.setting.slideContainer),
				_imgContainer = YJ.Q( that.setting.imgList );
				
			YJ.clearBlank( _imgContainer );
			that.Initialization( that.setting.num );
			that.checkType(that.setting.Btn,function(){
				var _leftBtn = YJ.Q( that.setting.Btn.left ),
					_rightBtn = YJ.Q( that.setting.Btn.right );
					YJ.on( _leftBtn, that.setting.eventType,function(){
						that.leftEvent(_leftBtn,_rightBtn);
					});
					YJ.on( _rightBtn, that.setting.eventType,function(){
						that.rightEvent(_leftBtn,_rightBtn);
					});
			});
			
			if( that.setting.autoPlay.play ){
				that.autoSlide();
				YJ.on( _slideContainer ,"mouseover",function(e){
					that.clearTimer( that._autoTimer );
				});

				YJ.on( _slideContainer ,"mouseout",function(e){
					that.autoSlide();
				});
			}
			
			that.checkType( YJ.Q(that.setting.numList),function(){
				YJ.on( YJ.Q(that.setting.numList ),that.setting.eventType,function(e){
					var _target = YJ.getTarget(e);
					if( _target.nodeName.toLowerCase() != that.setting.slideTarget ){
						return;
					}
					that.setting.num = that.index(_target);
					that.showSlide(that.setting.num);
				});
			});
			
			if( that.setting.effect.efficacy == "slide"){
				var _firstChild = _imgContainer.children[0];
				if( that.setting.effect.direction == 1){
					that.WIDTH = parseInt( YJ.getCssProperty(_firstChild,'width'));
					_imgContainer.style.width = that.WIDTH * that.LENGTH +"px";
				}else{
					that.HEIGHT = parseInt( YJ.getCssProperty(_firstChild,'height'));
					_imgContainer.style.height = that.HEIGHT * that.LENGTH +"px";
				}
			}
			that.showSlide(that.setting.num);
		}
	}
	win.FocusCarousel = FocusCarousel;
})(window);