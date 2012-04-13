/*
 * tab+loadContent
 * author:QF
 * time: 12-03-12
*/
function TabLoad( ctg ){
	this.options = {
			_tabHandle : $("#tab_ul li"),
			_curClass : "current",
			_bdHandle : $('#tab_bd'),
			_conHandle : ".m_tcon",
			_flag : "tflag",
			_eventType : "click",
			_num :0,
			_tabCon : "tabslide_",
			_callback : function(){}
		}
	this.option = $.extend( this.options,ctg );
	if( !(this instanceof TabLoad) ){
		return new TabLoad(ctg);  
	}	
	this.init();
}

TabLoad.prototype = {
	init : function(){
		var _option = this.option;
		_option._tabHandle.each(function(i){
			$(this).bind( _option._eventType,function(e){
				var that = $(this),
					_conHandle = _option._bdHandle.find( _option._conHandle );
				that.siblings().removeClass( _option._curClass ).end().addClass( _option._curClass );
				_conHandle.siblings( _option._conHandle ).hide();
				if( Object.prototype.toString.call( _option._callback ) == "[object Function]"){
					_conHandle.eq(i).show(0,function(){
						var _textObj = $("#"+_option._tabCon+i);
						var _flag = that.attr( _option._flag );
						if( _flag == "false"){
							var _v = _textObj.find('textarea').val();
							_textObj.first().append(_v);
							that.attr( _option._flag,"true");
						}
						(_option._callback)(i);
					});
				}
				e.preventDefault();
			})
		}).eq( _option._num ).trigger( _option._eventType )
	}
};
/*
function:   RescrollGapLevelSlide
*/
(function($) {
	$.fn.rglSlide=function(opt){
		//settings
		var settings=jQuery.extend(true,{
			productScrollWitch:"ul",
			list:"ul > li",
			row:1,
			seeColumn:1,
			step:1,
			speed:"normal",
			orientation:"left",
			isAutoPlay:{
				timer:3000,
				rescrollTime:2000,
				reboundState:true
			},
			isBtn:{
				step:1,
				left:"#left",
				right:"#right",
				disableCss:"disable",
				isChangeState:true
			},
			bugD1Width:0,
			callback:false
		},opt);
		//settings
		var productScrollWitch=settings.productScrollWitch,
			list=settings.list,
			row=settings.row,
			seeColumn=settings.seeColumn,
			step=settings.step,
			speed=settings.speed,
			orientation=settings.orientation,
			aut=settings.isAutoPlay,
			autTimer=aut.timer,
			autRescrollTime=aut.rescrollTime,
			autReboundState=aut.reboundState,
			btn=settings.isBtn,
			btnStep=btn.step,
			btnLeft=$(btn.left),
			btnRight=$(btn.right),
			btnDisableCss=btn.disableCss,
			btnIsChangeState=btn.isChangeState,
			bugD1Width=settings.bugD1Width,
			callback=settings.callback;
		//div
		var $this=$(this);
		var thisselector=$this.selector;
		var d1=$this,
			d2=d1.find(productScrollWitch),
			d3=d1.find(list);
		//d1Width
		var d1Width=d1.width();
		if(bugD1Width!=0){
			d1Width=bugD1Width;
		}else{
			if(d1Width==0){
				// alert("Err:d1Width==0");
			}
		}
		//other width size ...
		var d3Size=d3.size();
		var splitWidth=d1Width/seeColumn;
		var stepWidth=step*splitWidth;
		var stepWidthBtn=btnStep*splitWidth;
		var d2Width=splitWidth*Math.ceil(d3Size/row);
		//console.log(d2.width())
		
		//fall short of nmuber,return false
		if(d2Width<d1Width){
			//alert('x')
			btnLeft.addClass(btnDisableCss);
			btnRight.addClass(btnDisableCss);
			return false;
		}
		//bear with
		d2.width(d2Width+100);
		//
		var flag=true;
		//left
		var left=function(e){
			if(!flag)return false;
			flag=false;
			if(btnIsChangeState){
				orientation="left";
			}
			var _stepWidth=stepWidth;
			if(e){
				_stepWidth=stepWidthBtn;
			}else{
				_stepWidth=stepWidth;
			}
			if((d1Width+d1.scrollLeft())==d2Width){
				btnLeft.addClass(btnDisableCss);
				if(e){
					flag=true;
				}else{
					if(autRescrollTime){
						d1.animate({scrollLeft:0},autRescrollTime,function(){
							btnLeft.removeClass(btnDisableCss);
							btnRight.addClass(btnDisableCss);
							if(callback)callback($this,0,splitWidth,d1Width,d2Width);
							flag=true;
						});
					}else{
						if(autReboundState){
							orientation="right";
							if(aut){
								autoStop();
								autoPlay();
							}
						}
						flag=true;
					}
				}
			}else if(_stepWidth+d1.scrollLeft()>=d2Width-d1Width){
				d1.animate({scrollLeft:d2Width-d1Width},speed,function(){
					btnLeft.addClass(btnDisableCss);
					btnRight.removeClass(btnDisableCss);
					if(callback)callback($this,d2Width-d1Width,splitWidth,d1Width,d2Width);
					flag=true;
				});
			}else{
				d1.animate({scrollLeft:d1.scrollLeft()+_stepWidth},speed,function(){
					btnRight.removeClass(btnDisableCss);
					if(callback)callback($this,d1.scrollLeft(),splitWidth,d1Width,d2Width);
					flag=true;
				});
			}
			return false;
		};
		//right
		var right=function(e){
			if(!flag)return false;
			flag=false;
			if(btnIsChangeState){
				orientation="right";
			}
			var _stepWidth=stepWidth;
			if(e){
				_stepWidth=stepWidthBtn;
			}else{
				_stepWidth=stepWidth;
			}
			if(d1.scrollLeft()==0){
				btnRight.addClass(btnDisableCss);
				if(e){
					flag=true;
				}else{
					if(autRescrollTime){
						d1.animate({scrollLeft:d2Width-d1Width},autRescrollTime,function(){
							btnRight.removeClass(btnDisableCss);
							btnLeft.addClass(btnDisableCss);
							if(callback)callback($this,d2Width-d1Width,splitWidth,d1Width,d2Width);
							flag=true;
						});
					}else{
						if(autReboundState){
							orientation="left";
							if(aut){
								autoStop();
								autoPlay();
							}
						}
						flag=true;
					}
				}
			}else if((d1.scrollLeft())<=_stepWidth){
				d1.animate({scrollLeft:0},speed,function(){
					btnRight.addClass(btnDisableCss);
					btnLeft.removeClass(btnDisableCss);
					if(callback)callback($this,0,splitWidth,d1Width,d2Width);
					flag=true;
				});
			}else{
				d1.animate({scrollLeft:d1.scrollLeft()-_stepWidth},speed,function(){
					btnLeft.removeClass(btnDisableCss);
					if(callback)callback($this,d1.scrollLeft(),splitWidth,d1Width,d2Width);
					flag=true;
				});
			}
			return false;
		};
		//gotoscroll
		var gotoscroll=function(xy){
			if(!flag)return false;
			flag=false;
			d1.animate({scrollLeft:xy},speed,function(){
				if(callback)callback($this,xy,splitWidth,d1Width,d2Width);
				if(xy==0){
					btnRight.addClass(btnDisableCss);
					btnLeft.removeClass(btnDisableCss);
				}else if(xy==(d2Width-d1Width)){
					btnRight.removeClass(btnDisableCss);
					btnLeft.addClass(btnDisableCss);
				}else{
					btnRight.removeClass(btnDisableCss);
					btnLeft.removeClass(btnDisableCss);
				}
				flag=true;
			});
			return false;
		};
		//timer
		var timerID;
		var autoPlay=function(){
			switch(orientation)
			{
				case "left":timerID=window.setInterval(left,autTimer);break;
				case "right":timerID=window.setInterval(right,autTimer);break;
			}
			return false;
		};
		var autoStop = function(){
			window.clearInterval(timerID);
			return false;
		};
		if(aut){
			//ready autoPlay
			autoPlay();
			//
			$this.hover(autoStop,autoPlay);
			if(btn){
				btnLeft.hover(autoStop,autoPlay);
				btnRight.hover(autoStop,autoPlay);
			}
		}
		//btn
		if(btn){
			if( d3Size<=seeColumn ){
				btnLeft.addClass(btnDisableCss);
				btnRight.addClass(btnDisableCss);
				return false;
			}
			btnLeft.click(left);
			btnRight.click(right);
			switch(orientation)
			{
				case "left":
					//避免动画的同时初始化callback
					d1.scrollLeft(0);gotoscroll(0);
					btnRight.addClass(btnDisableCss);
					//console.log('xx')
					break;
				case "right":
					//避免动画的同时初始化callback
					d1.scrollLeft(d2Width-d1Width);gotoscroll(d2Width-d1Width);
					btnLeft.addClass(btnDisableCss);
					//console.log('yy')
					break;
			}
		}
		if(!aut){
			return {$this:$this,autoStop:false,autoPlay:false,gotoscroll:gotoscroll};
		}
		
		return {$this:$this,autoStop:autoStop,autoPlay:autoPlay,gotoscroll:gotoscroll};
	};
})(jQuery);



(function($) {

$.event.special.mousewheel = {
	setup: function() {
		var handler = $.event.special.mousewheel.handler;

		// Fix pageX, pageY, clientX and clientY for mozilla
		if ( $.browser.mozilla )
			$(this).bind('mousemove.mousewheel', function(event) {
				$.data(this, 'mwcursorposdata', {
					pageX: event.pageX,
					pageY: event.pageY,
					clientX: event.clientX,
					clientY: event.clientY
				});
			});

		if ( this.addEventListener )
			this.addEventListener( ($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = handler;
	},

	teardown: function() {
		var handler = $.event.special.mousewheel.handler;

		$(this).unbind('mousemove.mousewheel');

		if ( this.removeEventListener )
			this.removeEventListener( ($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = function(){};

		$.removeData(this, 'mwcursorposdata');
	},

	handler: function(event) {
		var args = Array.prototype.slice.call( arguments, 1 );

		event = $.event.fix(event || window.event);
		// Get correct pageX, pageY, clientX and clientY for mozilla
		$.extend( event, $.data(this, 'mwcursorposdata') || {} );
		var delta = 0, returnValue = true;

		if ( event.wheelDelta ) delta = event.wheelDelta/120;
		if ( event.detail     ) delta = -event.detail/3;
//		if ( $.browser.opera  ) delta = -event.wheelDelta;

		event.data  = event.data || {};
		event.type  = "mousewheel";

		// Add delta to the front of the arguments
		args.unshift(delta);
		// Add event to the front of the arguments
		args.unshift(event);

		return $.event.handle.apply(this, args);
	}
};

$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},

	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});

})(jQuery);


/**
  * to:内容延迟加载
  * author:f2er
**/
function PicLazyLoad(ctg){
	this.setting={
		_id:ctg.id,
		_cid:ctg.cid,
		_flag:ctg.flag,
		_callback:ctg.callback
	}
	if( !(this instanceof PicLazyLoad) ){
		return new PicLazyLoad(ctg);  
	}	
	this.init();   
}
PicLazyLoad.prototype={
	GetId:function(id){
		return typeof id =="string" ? document.getElementById(id) : id; 
	},
	GetPos:function(){
		var that=this;
		var _obj=this.GetId(that.setting._id);
		var _top=0;
		while(_obj){
			_top+=_obj.offsetTop;
			_obj=_obj.offsetParent;
		}
		return _top;
	},
	getStyle:function(ele,pro){
		var _ele=ele || this.ele;
		var _style=ele.currentStyle || document.defaultView.getComputedStyle(ele,null);
		var _value=_style[pro];
		return _value;
	},
	lazyPic:function(callback){
		var that=this,
			_clientHeight=document.documentElement.clientHeight || document.body.clientHeight,
			_scrollTop=document.documentElement.scrollTop || document.body.scrollTop,
			_clientTop=that.GetPos(that.setting._id),
			_obj=that.GetId(that.setting._id);
			var _height=that.getStyle(_obj,'height');
			var _v=_clientTop-_scrollTop;
			var _cflag=_obj.getAttribute(that.setting._flag);
			if(_cflag=="true"){
				return;	
			}
			if( _cflag =="false"){
				if(  _v >0 && _v< _clientHeight ){
					var _cid=that.GetId(that.setting._cid);
					var _textarea=_cid.getElementsByTagName('textarea')[0].value;
					var _dv=document.createElement('div');
					_dv.innerHTML=_textarea;
					_cid.appendChild(_dv);
					_obj.setAttribute(that.setting._flag,'true');
				}
			}
			callback();
		},
		addEvent:function(target,type,handle){
			if(target.addEventListener){
				target.addEventListener(type,handle,false);
			}else if( target.attachEvent){
				target.attachEvent('on'+type,handle);	
			}else{
				target["on"+type]=handle;	
			}
		},
		
		init:function(){
			var that=this;
			that.lazyPic(that.setting._callback);
			var _cflag=that.GetId(that.setting._id).getAttribute(that.setting._flag);
			if(_cflag=="false"){
				that.addEvent(window,'scroll',function(){	
					that.lazyPic(that.setting._callback);	
				})	
			}
		}	  
  }


/**
  * to:TabSlide
**/
function TabSlide(ctg){
			this.option = {
				_id : ctg.id,
				_eventType : ctg.eventType,
				_currentClass : ctg.currentClass,
				_nornalClass : ctg.nornalClass,
				_n		   : ctg.n,
				_opacityStart : ctg.opacityStart,
				_opacityEnd : ctg.opacityEnd,
				_step : ctg.step
			}
			if( !( this instanceof TabSlide )){
				return new TabSlide(ctg);
			}
			this._timer = null;
			this.init();
		}
		TabSlide.prototype = {
			addEvent : function( target,type,fn ){
				if( target.addEventListener ){
					target.addEventListener( type,fn,false );
				}else if( target.attachEvent ){
					target.attachEvent( "on"+type,fn );
				}else{
					target["on"+type] = fn;
				}
			},
			index : function(obj){
				var that = this,
					_objArray = document.getElementById(that.option._id).getElementsByTagName("dt");
				for( var i=0,_len = _objArray.length;i<_len;i++){
					if( obj == _objArray[i] ){
						return i;
					}
				}
			},
			getCss : function(element,property){
				if( element.currentStyle ){
					return element.currentStyle[property]
				}else{
					var computedStyle = document.defaultView.getComputedStyle(element,null)[property]
					return computedStyle;
				}
			},
			clearTimer : function(){
				var that = this;
				if( that._timer ){
					clearInterval( that._timer );
				}
				that._timer = null;
			},
			animateShow : function(obj){
				var that = this;
					time = that.option._opacityStart;
				function show(){
					time += that.option._step;
					obj.style.opacity = time/100;
					obj.style.filter = "alpha(opacity="+time+")";
					if( time >= that.option._opacityEnd ){
						that.clearTimer();
						time = that.option._opacityStart ;
					}
				}
				that.clearTimer();
				that._timer = setInterval(show,50)
			},
			doTarget : function(){
				var that = this,
					_obj = document.getElementById(that.option._id),
					_objArray = _obj.getElementsByTagName("div");
					
					_objArray[ that.option._n ].className = " "+that.option._currentClass;
					_objArray[ that.option._n ].getElementsByTagName('dd')[0].style.opacity = 1;
					_objArray[ that.option._n ].getElementsByTagName('dd')[0].style.filter = "alpha(opacity=100)";
				
				that.addEvent( _obj, that.option._eventType,function(event){
					
					var _ev = event || window.event,
						_target = _ev.target || _ev.srcElement;
					if( _target.nodeName.toLowerCase() != "dt"){
						return;
					}
					var _index = that.index( _target );
					for( var j=0,_len = _objArray.length;j<_len;j++){
						var _dd = _objArray[j].getElementsByTagName('dd')[0];
						_dd.style.opacity = that.option._opacityStart/100;
						_dd.style.filter = "alpha(opacity="+that.option._opacityStart+")";
						_objArray[j].className = ( j != _index ) ? that.option._nornalClass : that.option._nornalClass+" "+that.option._currentClass;
						var _targetImg = _objArray[_index].getElementsByTagName('dd')[0];
						that.animateShow(_targetImg)
					}
					
				})
			},
			init: function(){
				var that = this;
				that.doTarget();
			}
		}
TabSlide({ id:"js_tabSlide",eventType:"mouseover",currentClass:"on",nornalClass :"role_box",n:0,opacityStart:40,opacityEnd:100,step : 5 });
/**
  * to:Tab_two
**/

 function tab_two(i){
	if(i){
		$("#photo_more").attr("href","http://my.4399.com/album/square/700/");
	}else{
		$("#photo_more").attr("href","http://my.4399.com/album/square/701/");
	}
    var _obj=$("#tabsp_"+i+"_content");
    _obj.rglSlide({
        productScrollWitch:"ul",
        list:"ul>li",
        row:1,
        seeColumn:6,
        step:2,
        isAutoPlay:false,
        isBtn:{
                step:2,
                left:"#tab_sright_"+i,
                right:"#tab_sleft_"+i,
                disableCss:"disable"
            }
    });	
}


 TabLoad({
    	_tabHandle : $("#tab_ul_sp li"),
    	_curClass : "current",
		_bdHandle : $('#tab_bd_sp'),
		_conHandle : ".m_tcon",
		_flag : "tflag",
		_eventType : "click",
		_num :0,
		_tabCon : "tabsp_",
		_callback: function(i){
			tab_two(i);
		}
    })
