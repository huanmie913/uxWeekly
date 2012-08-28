	
/*
 * Page : 分页
 * Time : 2012-06-14
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
	
	
	/*Page*/
	function Page(ctg){
		this.opt = {
			maxNum     : 8,
			bid        : 'j-qlist',
			pid        : 'j_qpage',
			curClass   : 'cur',
			Initnum    : 1, // 初始化
			eventType  : "click"
		}
		this.option = QF.extend(this.opt,ctg||{});
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(ctg);
		}
		this.init();
	}
	Page.prototype = {
		constructor : Page,
		initPage : function(n,m){
			var that = this,
				_html = "";
			for(var i =1;i<=n;i++){
				_html +='<li class='+(m==i?"cur":"")+'>'+i+'</li>';
			}
			QF.$(that.option.pid).innerHTML = _html;
		},
		goPage : function(n){
			var that = this,
				len = QF.$( that.option.bid ).children.length;
			for( var i=0;i<len;i++){
				QF.$( that.option.bid ).children[i].style.display = ( i>=that.option.maxNum*(n-1) && i<that.option.maxNum*n ) ? "block" : "none";
			}
			
		},
		init : function(){
			var that = this,
				_children = QF.$( that.option.bid ).children,
				_len = _children.length,
				_pnum = 0;//总页数
			if(_len < that.opt.maxNum){
				_pnum = 1;
			}
			if( _len%that.opt.maxNum == 0 ){
				_pnum = _len/that.opt.maxNum;
			}else{
				_pnum = Math.floor(_len/that.opt.maxNum)+1;
			}
			that.initPage(_pnum,that.option.Initnum);
			that.goPage(that.option.Initnum);
			var _pchildren = QF.$( that.option.pid ).children;
			QF.addEvent( QF.$( that.option.pid ),that.option.eventType,function(e){
				var _ev = QF.getEvent(e),
					_target = QF.getTarget(_ev);
				if(_target.nodeName.toLowerCase()!="li"){
					return;
				}
				var _index = QF.getIndex(_target,_pchildren);
				that.goPage(_index+1);
				for( var j=0;j<_pchildren.length;j++){
					QF.$( that.option.pid ).children[j].className = (j==_index) ? that.option.curClass : "";
				}
			})
		}
	}
	win.Page = Page;
})(window);