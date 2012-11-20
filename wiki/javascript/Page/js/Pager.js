/*
 * Page   : 静态Javascript分页
 * update : 2012-09-21
 * author : 情封 uezheng@gmail.com
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
			//from tangram-1.5.2.2.js
            if( !id ){ return null; }
            if( 'string' == typeof id || id instanceof String ){
                return document.getElementById(id);
            }else if( id.nodeName && ( id.nodeType == 1 || id.nodeType == 9 )){
                return id;
            }
            return null;
		},
		IsFunction : function(callback){
            return {}.toString.call(callback) == "[object Function]" ? true : false;
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
		inArray : function(elem,array){
            if( array.indexOf ){
                return array.indexOf(elem);
            }
			for( var j=0,_len=array.length;j<_len;j++){
				if(array[j]==elem){
					return j;	
				}
			}
            return -1;
		},
        getStyle:function(ele,pro){
            var _ele = ele;
            var _style = ele.currentStyle || document.defaultView.getComputedStyle(ele,null);
            var _value = _style[pro];
            return _value;
        }
	}
	
	
	/*Page*/
	function Page(ctg){
		this.opt = {
			maxNum     : 8,
			bid        : 'j-qlist',
			pid        : 'j_qpage',
			curClass   : 'cur',
            btn        : {
               btnLeft : 'j-lb',
              btnRight : 'j-rb',
          disbaleClass : "_disbale"
            },
            //btn : null,
			Initnum    : 0, // 初始化
			eventType  : "click"
		}
		this.option = QF.extend(this.opt,ctg||{});
		if( !(this instanceof arguments.callee) ){
			return new arguments.callee(ctg);
		}
        this.index = this.option.Initnum;
        this.pnum = 0;//总页数
		this.init();
	}
	Page.prototype = {
		constructor : Page,
		initPage : function(n,m){
			var that = this,
				_html = "";
			for(var i =0;i<=n-1;i++){
				_html +='<li class='+(m==i?"cur":"")+'>'+(i+1)+'</li>';
			}
			QF.$(that.option.pid).innerHTML = _html;
            that.goPage( that.option.Initnum );
            that.btnStatus();
		},
        btnStatus : function(){
            var that = this;
            if( that.option.btn != null ){
                var btnLeft = QF.$( that.option.btn.btnLeft ),
                    btnRight = QF.$( that.option.btn.btnRight );
                if( that.pnum <= 1){
                    btnLeft.style.display = "none";
                    btnRight.style.display = "none";
                }
                if( that.index >0 && that.index < that.pnum ){
                    btnLeft.style.display = "block";
                    btnRight.style.display = "block";
                }
                if( that.index<=0 ){
                    btnLeft.style.display = "none";
                    btnRight.style.display = "block";
                }
                if( that.index>=that.pnum-1 ){
                    btnRight.style.display = "none";
                    btnLeft.style.display = "block";
                }
            }
        },
        numClass : function(pchildren){
            var that = this;
            for( var j=0;j<pchildren.length;j++){
                QF.$( that.option.pid ).children[j].className = (j == that.index) ? that.option.curClass : "";
            }
        },
		goPage : function(n){
			var that = this,
                _bTarget = QF.$( that.option.bid),
                _pchildren = _bTarget.children,
                _sHeight =  parseInt(QF.getStyle(_pchildren[0],'height'));
            _bTarget.style.marginTop =  -(n)*( that.opt.maxNum * _sHeight )+"px";
        },
        leftClick : function(){
            var that = this,
                _pTarget = QF.$( that.option.pid),
                _pchildren = _pTarget.children;
            --that.index;
            if(that.index<=0){
                that.index =0;
            }
            that.goPage(that.index);
            that.numClass(_pchildren);
            that.btnStatus();
        },
        rightClick : function(){
            var that = this,
                _pTarget = QF.$( that.option.pid),
                _pchildren = _pTarget.children;
            ++that.index;
            if(that.index>=that.pnum-1){
                that.index = that.pnum-1;
            }
            that.goPage(that.index);
            that.numClass(_pchildren);
            that.btnStatus();
        },
        btnEvent : function(){
            var that = this;
            var btnLeft = QF.$( that.option.btn.btnLeft ),
                btnRight = QF.$( that.option.btn.btnRight );
            QF.addEvent(btnLeft,'click',function(){
                that.leftClick();
            });
            QF.addEvent(btnRight,'click',function(){
                that.rightClick();
            });
        },
        keyEvent : function(e){
           var that = this,
               _ev = QF.getEvent(e),
               _codeEvent = _ev.keyCode;
           switch(_codeEvent){
               //右键
               case 39:
                    that.rightClick();
                    break;
                //左键
               case 37:
                    that.leftClick();
                    break;
           }
        },
        numEvent : function(_pTarget){
           var that = this;
           var _pchildren = _pTarget.children;
            QF.addEvent( _pTarget,that.option.eventType,function(e){
                var _ev = QF.getEvent(e),
                    _target = QF.getTarget(_ev);
                if(_target.nodeName.toLowerCase()!="li"){
                    return;
                }
                that.index = QF.inArray(_target,_pchildren);
                that.goPage(that.index);
                that.numClass(_pchildren);
                if( that.option.btn != null ){
                    that.btnStatus();
                }
            });
        },
		init : function(){
			var that = this,
				_children = QF.$( that.option.bid ).children,
				_len = _children.length,
                _pTarget = QF.$( that.option.pid);

			if(_len < that.option.maxNum){
                that.pnum = 1;
			}
			if( _len % that.opt.maxNum == 0 ){
                that.pnum = _len/that.option.maxNum;
			}else{
                that.pnum = Math.floor(_len/that.option.maxNum)+1;
			}
			that.initPage( that.pnum,that.option.Initnum );
            that.numEvent(_pTarget);
            if( that.option.btn != null ){
                that.btnEvent();
            }
            QF.addEvent(document,"keydown",function(e){
                that.keyEvent(e);
            });
		}
	}
	win.Page = Page;
})(window);