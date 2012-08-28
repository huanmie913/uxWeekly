/*
 * to:文字滚动
 * add by: f2er 11-07-28
 * update by:11-08-16
*/
function txtScroll(ctg){
	if(!(this instanceof txtScroll )){
		return new txtScroll(ctg);	
	}
	//初始值
	this._defaultOption={
		_id : ctg.id,
		_tag : ctg.tag,
		_dir : ctg.dir || "up",
		_speed :ctg.speed || 500,
		_line : ctg.line || 1,
		_step:ctg.step || 1	,
		_delay:ctg.delay || 1000 
	}
	this.tempScroll=0;//滚动长度
	this.timer=null;
	this._t=null;
	this._pause = 0;
}

txtScroll.prototype={
	get$:function(obj){
		return typeof obj=='object' ? obj : document.getElementById(obj)	
	},
	//清除空白节点
	clearWhiteSpce:function(oEelement){
		for(var i=0;i<oEelement.childNodes.length;i++){
	  		var node=oEelement.childNodes[i];
	  		if(node.nodeType==3 && !/\S/.test(node.nodeValue)){
				node.parentNode.removeChild(node)
			}
	  }
	},
	doScroll:function(opt,obj,h){
		var that=this;
		clearTimeout(that._t);
		that._t=setTimeout(function(){ that.scrollDir(opt,obj,h)},opt._delay)	
	},
	doStop:function(obj){
		var that=this;
		obj.onmouseover=function(){
			clearTimeout(that._t);
			that._pause = 1;	
		}	
	},
	doPlay:function(opt,obj,h){
		var that=this;
		//onmouseout
		obj.onmouseout=function(){
			that._pause = 0;
			that.doScroll(opt,obj,h);
		}	
	},
	//scrollUp
	scrollUp:function(opt,obj,h){
		var that=this;
		that.timer=setInterval(function(){
					that.tempScroll+=opt._step;
					if(that.tempScroll>h){
						var _firstChild=obj.removeChild(obj.firstChild);
						obj.appendChild(_firstChild);
						that.tempScroll=0;
					}
					if(that.tempScroll==h){
						clearInterval(that.timer);
						if(that._pause == 0){
							that.doScroll(opt,obj,h);
						}
					}
					obj.style.marginTop=-that.tempScroll+"px";
			},opt._speed);
	},
	//scrollDown
	scrollDown:function(opt,obj,h){
		var that=this;
		that.timer=setInterval(function(){
					that.tempScroll+=opt._step;
					if(that.tempScroll>h){
						that.tempScroll=0;
						var _lastChild=obj.removeChild(obj.lastChild);
						obj.insertBefore(_lastChild,obj.firstChild);
					}
					if(that.tempScroll==0){
						clearInterval(that.timer);
						if(that._pause == 0){	
							that.doScroll(opt,obj,h);
						}
					}
					obj.style.marginTop=that.tempScroll+"px";
			},opt._speed);
	},
	//scroDir
	scrollDir:function(opt,obj,h){
		var that=this;
		if (that.timer){
			clearInterval(that.timer);
		}
		switch(opt._dir){
			case "up":
				//向上滚动
				that.scrollUp(opt,obj,h);
				break;
			case "down":
				//向下
				that.scrollDown(opt,obj,h);
				break;
		}
	},
	//init
	init:function(){
		var that=this,_default= that._defaultOption,_obj=that.get$(_default._id);
		that.clearWhiteSpce(_obj);
		_length=_obj.getElementsByTagName(_default._tag).length;
		var _height= _obj.firstChild.offsetHeight,_scrollHeight = _default._line *_height;
		//scrollDir
		//that.scrollDir(_default,_obj,_scrollHeight);
		if( _length!=1 && _length!=0 ){
			/*add by ZhaoWei 2011-9-21*/
			that.doScroll(_default,_obj,_scrollHeight);
			
			//onmouseover
			that.doPlay(_default,_obj,_scrollHeight);
			that.doStop(_obj)
		}
		
	}		
}