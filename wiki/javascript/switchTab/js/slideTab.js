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
				_n		   : ctg.n,
				_opacityStart : ctg.opacityStart,
				_opacityEnd : ctg.opacityEnd,
				_step : ctg.step
			}
			if( !( this instanceof TabSlide )){
				return new TabSlide(ctg);
			}
			this._timer = null;
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
			clearTimer : function(){
				var that = this;
				if( that._timer ){
					clearInterval( that._timer );
				}
				that._timer = null;
			},
			animateShow : function(obj){
				var that = this;
					time = that.option._opacityStart;
				function show(){
					time += that.option._step;
					obj.style.opacity = time/100;
					obj.style.filter = "alpha(opacity="+time+")";
					if( time >= that.option._opacityEnd ){
						that.clearTimer();
						time = that.option._opacityStart ;
					}
				}
				that.clearTimer();
				that._timer = setInterval(show,50)
			},
			doTarget : function(){
				var that = this,
					_obj = document.getElementById(that.option._id),
					_objArray = _obj.getElementsByTagName("div");
					
					for( var i = 0,len =_objArray.length;i<len;i++ ){
						
					}
					_objArray[ that.option._n ].className = " "+that.option._currentClass;
					_objArray[ that.option._n ].getElementsByTagName('dd')[0].style.opacity = 1;
					_objArray[ that.option._n ].getElementsByTagName('dd')[0].style.filter = "alpha(opacity=100)";
				
				that.addEvent( _obj, that.option._eventType,function(event){
					
					var _ev = event || window.event,
						_target = _ev.target || _ev.srcElement;
					if( _target.nodeName.toLowerCase() != "dt"){
						return;
					}
					var _index = that.index( _target );
					for( var j=0,_len = _objArray.length;j<_len;j++){
						var _dd = _objArray[j].getElementsByTagName('dd')[0];
						_dd.style.opacity = that.option._opacityStart/100;
						_dd.style.filter = "alpha(opacity="+that.option._opacityStart+")";
						_objArray[j].className = ( j != _index ) ? that.option._nornalClass : that.option._nornalClass+" "+that.option._currentClass;
						var _targetImg = _objArray[_index].getElementsByTagName('dd')[0];
						that.animateShow(_targetImg)
					}
					
				})
			},
			init: function(){
				var that = this;
				that.doTarget();
			}
		}