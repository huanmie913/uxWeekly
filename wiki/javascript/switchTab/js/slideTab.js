/**
  * to:TabSlide
  * author:f2er
  * time:12-03-27
**/
function TabSlide(ctg){
			this.option = {
				_id : ctg.id,
				_eventType : ctg.eventType,
				_currentClass : ctg.currentClass,
				_nornalClass : ctg.nornalClass,
				_n		   : ctg.n
			}
			if( !( this instanceof TabSlide )){
				return new TabSlide(ctg);
			}
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
			doTarget : function(  ){
				var that = this,
					_obj = document.getElementById(that.option._id),
					_objArray = _obj.getElementsByTagName("div");
					_objArray[ that.option._n ].className = " "+that.option._currentClass;
					
				var _content = _objArray[ that.option._n ].getElementsByTagName('dd')[0];
				var _width = parseInt(that.getCss(_content,'width'));
				
				that.addEvent( _obj, that.option._eventType,function(event){
					var _ev = event || window.event,
						_target = _ev.target || _ev.srcElement;
					if( _target.nodeName.toLowerCase() != "dt"){
						return;
					}
					var _index = that.index( _target );
					for( var j=0,_len = _objArray.length;j<_len;j++){
						_objArray[j].className = ( j != _index ) ? that.option._nornalClass : that.option._nornalClass+" "+that.option._currentClass;
					}
				
				})
			},
			init: function(){
				var that = this;
				that.doTarget();
			}
		}