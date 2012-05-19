/*
 * plugIn:TabDelayed(Tab切换+内容延迟加载)
 * depend:js
 * author:QF
 * time: 12-05-18
*/

(function(win,undefined){
	var doc = win.document;
	Object.prototype.extend = function(desction,source){
		for( var prop in source ){
			if( source.hasOwnProperty(prop) ){
				desction[prop] = source[prop];
			}
		}
		return desction;
	}
	var QF = QF || {};
	QF = {
		$ : function(id){
			return ( typeof id == "string" ) ? doc.getElementById(id) : id;
		},
		preventDefault:function(e){
			if( e && e.preventDefault){
				e.preventDefault();
			}else{
				e.returnValue=false;	
			}	
		},
		getEvent : function(e){
			return e || win.event;
		},
		getTarget : function(e){
			return e.target || e.srcElement;
		},
		addEvent : function(otarget,otype,ofn){
			if( otarget.addEventListener ){
				otarget.addEventListener(otype,ofn,false);
			}else if( otarget.attachEvent ){
				otarget.attachEvent("on"+otype,function(){
					ofn.call(otarget);
				});
			}else{
				otarget["on"+otype] = ofn;
			}
		},
		IsFunction : function(obj){
			if( Object.prototype.toString.call(obj) == "[object Function]"){
				(obj)();
			}
		}
	}
	
	/*TabDelayed*/
	function TabDelayed(ctg){
		this.setting={
			tabid:"tab_type",
			htag:"tab-item", 
			currentClass:"cur",
			bid:"tab_ooxx", /*内容区ID*/
			btag:"tab-content", /*内容区标识*/
			dPro:"data-loaded",/*是否加载过*/
			eventType : "click",
			callback : function(){}
		};
		this.GLOBAL = {
			tId : null,
			bId : null
		}
		this.option = Object.extend(this.setting,ctg || {});
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(this.option);
		}	
		this.init();
	}
	TabDelayed.prototype = {
		constructor : TabDelayed,
		getData:function(n){
			var that = this;
			if( that.GLOBAL.bId[n].getAttribute('data-widget') != that.option.btag ){
				return;
			}
			var _tabContent = that.GLOBAL.bId[n];
			var _textarea = _tabContent.getElementsByTagName('textarea')[0];
			var _ul  =document.createElement('ul');
			_ul.innerHTML = _textarea.value;
			_tabContent.replaceChild(_ul,_textarea);
			QF.IsFunction( that.option.callback );
		},
		getIndex:function(node,obj){
			var that=this;
			for( var j=0,_len=obj.length;j<_len;j++){
				if(obj[j]==node){
					return j;	
				}
			}
		},
		checkLoad : function(obj,i){
			var that = this;
			if( !obj.getAttribute(that.option.dPro) || obj.getAttribute(that.option.dPro) == "false"){
				that.getData(i);
				obj.setAttribute(that.option.dPro,'true');
			}
		},
		trigger : function(i){
			var that = this;
			for( var n=0,len = that.GLOBAL.tId.length;n<len;n++){
				that.GLOBAL.tId[n].className = (n == i) ? that.option.currentClass : "";
			}
			for( var m=0,len = that.GLOBAL.bId.length;m<len;m++){
				that.GLOBAL.bId[m].style.display = (m == i) ? "block" : "none";
			}
			that.checkLoad(that.GLOBAL.tId[i],i);
			
			return that;
		},
		doEvent : function(){
			var that = this;
			QF.addEvent(QF.$(that.option.tabid),that.option.eventType,function(e){
            	var _ev = QF.getEvent(e),
            		_target = QF.getTarget(_ev),
            		_element = null,
            		_index = 0;

            	//判断点击对象的ID
            	if( _target.id == that.option.tabid ){
            		return;
            	}

            	//判断当前对象的自定义属性
            	if(  _target.getAttribute("data-widget") != that.option.htag){
            		_element = _target.parentNode;
            	}else{
            		_element = _target;
            	}
            	_index = that.getIndex(_element,that.GLOBAL.tId);
            	that.trigger(_index);
				that.checkLoad(_element,_index);
				QF.preventDefault(_ev);
            });

		},
		init:function(){
			var that = this;
			that.GLOBAL.tId = QF.$(that.option.tabid).children;
            that.GLOBAL.bId = QF.$(that.option.bid).children;
            that.doEvent();
			return that;
		}	
	}
	win.TabDelayed = TabDelayed;
})(window);



