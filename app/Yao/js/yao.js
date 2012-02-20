/*
 * to: 桌游助手beta
 * author :f2er
 * time : 2012-02-18
 * update: 新增 设备手机震动
*/

/*
 * 配置文件
*/
var setting = { container:"mod_area",
			   num:3,
			   cn:"s",
			   subtraBtn:"subtraction",
			   addBtn : "add",
			   numID : "num",
			   maxNum : 6,
			   yaoBtn : "button"
			 }

var Yao = (function( option ){
			var _opt = {
						_area : option.container, //容器ID
						_num : option.num, //色子个数
						_class : option.cn, //色子class
						_subtraBtn : option.subtraBtn, //减id
						_addBtn : option.addBtn, //加id
						_numId : option.numID, //个数id
						_maxNum : option.maxNum, //最大个数
						_yaoBtn : option.yaoBtn //摇起来按钮ID
					},
				pointer = [ 1,2,3,4,5,6 ],
				_container = Q( _opt._area ),
				_numId = Q( _opt._numId );
			
			/*M*/			
			function Q( id ){
                     return typeof id =="string" ? document.getElementById(id) : id;
			}
			
			function getCss( obj,property ){
				if( obj.currentStyle ){
					return obj.currentStyle[ property ];
				}else if( window.getComputedStyle ){
					var prop = property.replace(/([A-Z])/g, "-$1");
					prop = property.toLowerCase();
					return document.defaultView.getComputedStyle(obj,null)[ property ];
				}
			}
			
			function addEvent( target,type,fn){
				return target.addEventListener( type,fn,false);
			}
			
			/*c*/
			function subtraction(){
				addEvent( Q( _opt._subtraBtn ),"click",function(){
					if( _numId.innerHTML <= 1 ){
						alert('已经达到最小个数了');
					}else{
						_numId.innerHTML--;
					}
					_opt._num = _numId.innerHTML ;
					navigator.vibrate(1000);
				})
			}
		   function add(){
				addEvent( Q( _opt._addBtn ),'click',function(){
					if( _numId.innerHTML >= _opt._maxNum ){
						alert('已经达到最大个数了');
					}else{
						_numId.innerHTML++;
					}
						_opt._num = _numId.innerHTML ;
						navigator.vibrate(1000);
				})
			}
			
			/*V*/
			function createPointer(){
				if( _container.getElementsByClassName( _opt._class ).length > 0 ){
					_container.innerHTML = "";
				}
				var _dfrag = document.createDocumentFragment();
				for ( var i=0;i< _opt._num;i++){
					 var _dpoint = document.createElement('div');
					 _dpoint.id = _opt._class + i;
					 _dpoint.className = _opt._class;
					 var _pointerNum = Math.random();
					 _dpoint.innerHTML = '<div class="is"><img src="images/pointer/'+ pointer[ Math.floor( _pointerNum * pointer.length) ]+'.png"/><\/div>';
					 _dfrag.appendChild(_dpoint);
				}
				_container.appendChild(_dfrag);
				setPos();
			}
			
			function setPos(){
				var _objArray = _container.getElementsByClassName( _opt._class );
					for ( var i = 0;i< _objArray.length;i++){
						reSetPos(_objArray[i]);
					}
			}
			
			function reSetPos(obj){
				var _containerWidth = parseInt( getCss( _container,"width") ),
					_containerHeight = parseInt( getCss( _container,"height") ),
					_dpLeft = Math.floor( Math.random() * _containerWidth ),
					_dpTop = Math.floor( Math.random() * _containerHeight ),
					_pointerWidth = parseInt( getCss( obj,'width' )),
					_pointerHeight = parseInt ( getCss( obj,'height' ));

				//色子水平坐标
				if( _dpLeft + _pointerWidth > _containerWidth ){
					obj.style.left = ( _containerWidth - _pointerWidth )+"px";
				}else{
					obj.style.left = _dpLeft +"px";
				}

				//色子垂直坐标
				if ( _dpTop + _pointerHeight > _containerHeight ){
					 obj.style.top = ( _containerHeight - _pointerHeight )+"px";
				}else{
					 obj.style.top = _dpTop+"px";
				}
			}
			
			function init(){
				_numId.innerHTML = _opt._num;
				subtraction();
				add();
				addEvent( Q( _opt._yaoBtn ),'click',function(){
					createPointer();
					//navigator.vibrate(1000);
				});
				addEvent( window,'devicemotion',function(event){
					var alpha = event.alpha,/*y*/
						beta = event.beta,/*z*/
						gamma = event.gamma ;/*x*/
					var x = event.accelerationIncludingGravity.x,
						y = event.accelerationIncludingGravity.y,
						z =event.accelerationIncludingGravity.z;
					var rotationRate = x +"<br/>"+y +"<br/>"+z;
					document.getElementById("out").innerHTML =rotationRate;
					if( rotationRate >10){
						createPointer();
					}
				})
			}
			
			return {
				init : init,
				yaoBtn : createPointer
			}
		  })( setting );