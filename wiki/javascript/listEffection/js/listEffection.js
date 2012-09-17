/*
 * to: 文字列表hover改变背景颜色
 * time : 2012-03-27
 * author :QF
*/
/*
 @ id          : 列表ID
 @ currentClass: hover的样式
 @ tag         : 标签
 @ originClass : 原始类名
*/
(function(win,undefined){
	var version = 1.0;
	
	var doc = win.document;
	Object.prototype.extend = function(destination,sourece){
		for( var prop in sourece){
			if( sourece.hasOwnProperty(prop) ){
				destination[prop] = sourece[prop];
			}
		}
		return destination;
	}
	
	var QF = QF || {};
	QF = {
		$ : function(id){
			return typeof id == "string" ? doc.getElementById(id) : id;
		},
		addEvent : function(obj,type,fn){
			if( obj.addEventListener ){
				obj.addEventListener(type,fn,false);
			}else if( obj.attachEvent ){
				obj.attachEvent("on"+type,function(){
					fn.call(obj);
				});
			}else{
				obj["on"+type]=fn;
			}
		}
	}

	function listEffection(ctg){
		this.setting = {
					id           : "js_textList",
				    tag          : "tr",
					currentClass : "hover",
					originClass  : {
										oddClass : "odd",
										evenClass: "even"
									} //odd : 奇行  even :偶行
		}
		this._opt = Object.extend( this.setting,ctg || {});
		if( !(this instanceof arguments.callee)){
			return new arguments.callee(ctg);
		}
		
		this.GLOBAL = {
			_ArrayList : null,
			_len   : 0
		}
		this.init();
		
	}
	listEffection.prototype = {
		constructor : listEffection,
		
		interlacedColor : function(){
			var that = this;
			for( var i = that.GLOBAL._len-1; i>=0; i-- ){
				if( i%2 ==0 ){
					that.GLOBAL._ArrayList[i].className = self._opt.originClass.evenClass;
				}else{
					that.GLOBAL._ArrayList[i].className = self._opt.originClass.oddClass;
				}
			}
			return that;
		},
		switchColor : function(){
			var that = this;
			for( var i = that.GLOBAL._len-1; i>=0; i--){
				var _tmpClass = "";
				QF.addEvent(that.GLOBAL._ArrayList[i],"mouseover",function(){
					_tmpClass = this.className;
					this.className += " "+self._opt.currentClass;
				});
				QF.addEvent(that.GLOBAL._ArrayList[i],"mouseout",function(){
					this.className = _tmpClass;
				});
			}
			return that;
		},
		init : function(){
			var that = this;
			that.GLOBAL._ArrayList = QF.$( self._opt.id ).getElementsByTagName( self._opt.tag ),
			that.GLOBAL._len = that.GLOBAL._ArrayList.length;
			return that;
		}
	}
	win.listEffection = listEffection;
})(window);