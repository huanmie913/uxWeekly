
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
* 开服提示
* author :QF
* time: 12-03-10
* timeTip.init();
*/
var timeTip = (function(id,data){
	var _id = $("#"+id),
		_flag = 0,
		_t = null;
	function getPos(o,target){
		var _x = o.offset().left+120,
			_y = o.offset().top+25;
		target.css({"left":_x,"top":_y});
	}
	function tpl(data){
		var _html = '<div class="sns_tip" id="sns_tip"><div class="m_arrow"><em>◆</em><span>◆</span></div><div id="J_time"></div></div>';
		if( $("#sns_tip").size() == 0){
			$("body").append( _html);
		}
		if( $("#J_time").size() > 0){
			$("#sns_tip").show();
			$("#J_time").html(data);
		}
		
		$("#sns_tip").hover(function(e){
			clearTime();
			_flag = 1;
		},function(e){
			clearTime();
			var _target = e.relatedTarget;
			while( _target != null && (_target.className !="sns_tip")){
				_target=_target.parentNode;
			}
			if( _target == null ){
				_flag = 0;
				_t = setTimeout(function(){
					hideObj();
				},50)
			}
		})
	}
	function clearTime(){
		clearTimeout(_t);
	}
	function hideObj(){
		if( !_flag ){
			$("#sns_tip").hide();
		}
	}
	function doEvent(){
		_id.find('li').each(function(i){
			$(this).hover(function(){
				var _data = $(this).attr(data);
				_flag = 1;
				if( _data != undefined){
					tpl(_data)
					getPos($(this),$("#sns_tip") );
				}
			},function(e){
				_flag = 0;
				_t = setTimeout(function(){
					hideObj();	
				},50)
			})
		})
	}
	function init(){
		clearTime();
		doEvent();
	}
	return { init:init}
})("sns_service","data");


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
		console.log(d2.width())
		
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

