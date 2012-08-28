/*
 *add by f2er 11-09-09
 *to:dropDown
*/

~(function(win,undefined){
	var doc = win.document;

	/**/
	var QF = QF || {};
	QF = {
		$ : function(id){
			return typeof id == "string" ? doc.getElementById(id) : id;
		},
		stopPropagation:function(ev){
			if( ev && ev.stopPropation){
				ev.stopPropagation();
			}else{
				ev.cancelBubble=true;//IE	
			};
		},
		preventDefault:function(ev){
			if( ev && ev.preventDefault ){
				ev.preventDefault();
			}else{
				ev.returnValue=false;
			}
		},
		attachEvent:function(o,otype,fn){
			if(o.addEventListener){
				o.addEventListener(otype,fn,false);
			}else if(o.attachEvent){
				o.attachEvent('on'+otype,fn);
			}else{
				o["on"+otype]=fn;
			}
		},
		extend : function(destination, source){
			for (var property in source) {
		        destination[property] = source[property];
		    }
		    return destination;
		},
		getParent:function(ele){
			var parent=ele.parentNode;
			return parent && parent.nodeType != 11 ? parent : null;
		},
		//判断包含关系:容器p包含容器c
		doContainer:function(p,c){
			if( doc.documentElement.contains ){//ie支持
				return p!==c && ( p.contains ? p.contains(c) : true  )
			}else if( doc.documentElement.compareDocumentPosition ){//ff支持
				return !!( p.compareDocumentPosition(c) & 16);
			}else {
				return false;
			}	
		}
	};

	/*下拉dropDown*/
	function dropDown(ctg){
		this.opt = {
				dropBox:"m_tlist",
				dropTarget:"m_tvalue",
				openClass:"m_tvalue",/*开启*/
				closeClass:"m_tvalue",/*关闭*/
				inputValue:"fieldid",
				activeClass:"active",
				callback : function(){}
			}
		this.setting = QF.extend(this.opt,ctg);
		if( !(this instanceof arguments.callee)){
			return new arguments.callee(ctg);
		}
		this.showFlag = false,//是否打开
		this.parentFlag = null,//父容器
		this.init();
	}
	dropDown.prototype = {
		doHide : function(){
			var that = this;
			if( that.showFlag){
				QF.$(that.setting.dropBox).style.display = "none";
				QF.$(that.setting.dropTarget).className = that.setting.closeClass;
			}
		},
		doEvent : function(callback){
			var that=this;
			var obj=QF.$(that.setting.dropBox);
			QF.$(that.setting.dropTarget).onclick=function(e){
				var e=e || window.event;
				if(that.showFlag==false){	
					obj.style.display="block";
					that.showFlag=true;
					that.parentFlag=QF.getParent(this);
					callback && callback();
					QF.stopPropagation(e);	
				}else{
					obj.style.display="none";
					that.showFlag=false;	
				}
			}
			QF.attachEvent(document,'click',function(e){
				var e=e || window.event;
				var _target=e.target || e.srcElement;
				if(that.parentFlag){//父容器存在
					if(!QF.doContainer(that.parentFlag,_target) || !that.parentFlag==_target){
						that.doHide();
						that.showFlag=false;
					}
				}		
			});
		},
		init : function(){
			var that = this;
			if( Object.prototype.toString.call( that.setting.callback )=='[object Function]'){
				 that.doEvent(that.setting.callback);
			}
		}
	}
	win.dropDown = dropDown;
})(window);
