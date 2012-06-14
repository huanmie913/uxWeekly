

	
/*
 * Page : 分页
*/
(function(win,undefined){
	var doc = win.document;
	var QF = QF || {};
	QF = {
		extend : function(destination,source){
			for( var prop in source ){
				if( source.hasOwnProperty(prop) ){
					destination[prop] = source[prop];
				}
			}
			return destination;
		},
		$ : function(id){
			return typeof id == "string" ? doc.getElementById(id) : id;
		},
		IsFunction : function(callback){
			if( {}.toString.call(callback) == "[object Function]"){
				return true;
			}else{
				return false;
			}
		},
		addEvent : function(otarget,otype,ofn){
			if(otarget.addEventListener){
				otarget.addEventListener(otype,ofn,false);
			}else if(otarget.attachEvent){
				otarget.attachEvent('on'+otype,function(){
					ofn.call(otarget);
				});
			}else{
				otarget["on"+otype] = ofn;
			}
		},
		getEvent : function(e){
			return e || window.event;
		},
		getTarget : function(e){
			return e.target || e.srcElement;
		},
		getIndex : function(target,obj){
			for( var j=0,_len=obj.length;j<_len;j++){
				if(obj[j]==target){
					return j;	
				}
			}
		}
	}
	/*WeekTab*/
	function WeekTab(ctg){
		this.opt = {
			tid       : "j-tabweek",
			bid       : "j-qlist",
			tag       : "li",
			curClass  : "cur",
			eventType : "click",
			tnum      : 3,
			dataArr   : DHlist,
			callback  : function(){}
		}
		this.option = QF.extend(this.opt,ctg || {});
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(ctg);
		}
		this.init();
	}
	WeekTab.prototype = {
		constructor : WeekTab,
		getData : function(n){
			var that = this,
				_aList = that.option.dataArr[n],
				_html = "";
			for( var i=0,len = _aList.length;i<len;i++ ){
				var _list = _aList[i];
				_html += '<li><span class="nr">第<em>'+_list.num+'</em>集</span><a href="'+_list.href+'">'+(i< that.option.tnum ? '<span class="tt">&middot;</span>' : '&middot;')+_list.title+'</a></li>';
			}	
			QF.$( that.option.bid ).innerHTML = _html;
		},
		trigger : function(n){
			var that = this,
				_aTag = QF.$( that.option.tid ).getElementsByTagName( that.option.tag );
			for( var len = _aTag.length-1;len>=0;len--){
				_aTag[len].className = (len == n ) ? that.option.curClass : "";
			}
			that.getData(n);
			QF.IsFunction(that.option.callback) && (that.option.callback)();
		},
		init : function(){
			var that = this,
				_odate = new Date().getDay(),
				_aTag = QF.$( that.option.tid ).getElementsByTagName( that.option.tag );
				that.trigger(_odate);

			QF.addEvent( QF.$( that.option.tid ),that.option.eventType,function(e){
				var _ev = QF.getEvent(e),
					_target = QF.getTarget(_ev);
				if(_target.nodeName.toLowerCase()!="li"){
					return;
				}
				_odate = QF.getIndex(_target,_aTag);
				that.trigger(_odate);
			})
		}
	}
	
	win.WeekTab = WeekTab;
})(window);