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
		getElementsByclass:function(root,tag,classStr){
			var that=this;
			var _root,_tag;
			if(root){
				_root=(typeof root=="string") ? that.$(root):root;
			}else{
				_root=doc.body;	
			};
			_tag=tag || "*";
			var _eles=_root.getElementsByTagName(_tag),_arr=[];
			for(var i=0,n=_eles.length;i<n;i++){
				var _temp=_eles[i].className.split(" ");
				for(var j=0,_tLen=_temp.length;j<_tLen;j++){
					if(classStr.match(_temp[j])){
						_arr[_arr.length]=_eles[i];
						break;
					};
				};	
			}
			return _arr;
		},
		preventDefault:function(e){
			var ev=e||window.event;
			if( ev && ev.preventDefault){
				ev.preventDefault();
			}else{
				ev.returnValue=false;	
			}	
		},
		getEvent : function(e){
			return e || win.event;
		},
		getTarget : function(e){
			return e.target || e.srcElement;
		},
		addEvent : function(otype,otarget,ofn){
			if( otarget.addEventListener ){
				otarget.addEventListener(otype,ofn,false);
			}else if( otarget.attachEvent ){
				otarget.attachEvent("on"+otype,function(){
					ofn.call(otarget);
				});
			}else{
				otarget["on"+otype] = ofn;
			}
		}
	}
	
	/*TabDelayed*/
	function TabDelayed(ctg){
		this.setting={
			tabid:"tab_type",
			htag:"tab-item",
			currentClass:"cur",
			bid:"tab_ooxx",
			bnode:"div",
			btag:"tab-content",
			//bclass:"m_imglist",
			dPro:"data-loaded"/*自定义属性*/
			//mid:"mt_wrt",
			//num :0,
			//postUrl:"http://www.4399.com"
		}
		this.option=Object.extend(this.setting,ctg || {});
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(this.option);
		}	
		this.init();
	}
	TabDelayed.prototype = {
		constructor : TabDelayed,
		exec : function(tag,btag){
			var that = this,
				_m = that.option.num;
			tag[_m].className = that.option.currentClass;
			tag[_m].setAttribute(that.option.dPro,'true');
			var _uid = tag[_m].getAttribute('id');
			btag[_m].style.display = "block";
			that.getData(_m);
			//that.doMore(_uid)	
		},
		/*doMore:function(m){
			var that=this;
			var _url=that.option.postUrl+m;
			that.$get(that.option.mid).innerHTML='<a href="'+_url+'" title="更多&gt;&gt;">更多&gt;&gt;</a>';	
		},*/
		getData:function(n){
			var that=this;
			var _tabBd = QF.$(that.option.bid).getElementsByTagName(that.option.bnode)[n];
			var _textarea = _tabBd.getElementsByTagName('textarea')[0];
			var _ul  =document.createElement('ul');
			_ul.innerHTML = _textarea.value;
			_tabBd.insertBefore(_ul,_tabBd.childNodes[0]);
		},
		getIndex:function(node,obj){
			var that=this;
			for( var j=0,_len=obj.length;j<_len;j++){
				if(obj[j]==node){
					return j;	
				}
			}
		},
		trigger : function(i){
			var that = this,
				_htag = QF.$(that.option.hid).getElementsByTagName(that.option.htag);
				_bcon = QF.getElementsByclass(QF.$(that.option.bid),that.option.bnode,that.option.bclass);
			for( var m=0,len=_htag.length;m<len;m++){
				_htag[m].className = ( m == i) ? that.option.currentClass:"";
			}
			for( var n=0,len=_bcon.length;n<len;n++){
				_bcon[n].style.display = ( n == i ) ? "block":"none";	
			}
			return that;
		},
		init:function(){
			var that=this;
			//var _htag = QF.$(that.option.hid).getElementsByTagName(that.option.htag);
			var _bcon = QF.getElementsByclass(QF.$(that.option.bid),that.option.bnode,that.option.bclass);
			that.exec(_htag,_bcon);
			
			QF.addEvent( QF.$( that.option.tabid ),"click",function(e){
				var ev = QF.getEvent(e),
					_target= QF.getTarget(ev);
				if( _target.getAttribute( "data-widget" ) != that.option.htag ){
					return;	
				};
				//var ele = _target.parentNode;
				var ele = _target;
				var _index = that.getIndex(ele,_htag);
				that.trigger(_index);
				if( ele.getAttribute(that.option.dPro) == "false" ){
					that.getData(_index);
					ele.setAttribute(that.option.dPro,'true');
				}
				//that.doMore(_uid);
				QF.preventDefault(ev);
			});
			
			return that;
		}	
	}
	win.TabDelayed = TabDelayed;
})(window);



