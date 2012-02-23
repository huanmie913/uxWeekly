/*
 * to: 桌游助手beta
 * author :f2er
 * time : 2012-02-20
 * update: 新增 设备手机震动,加速器
*/

		  		  
 function Yao( ctg ){
        this.setting = {
            _area : ctg.container, //容器ID
            _num : ctg.num, //色子个数
            _class : ctg.cn, //色子class
			_subtraBtn : ctg.subtraBtn, //减id
			_addBtn : ctg.addBtn, //加id
			_numId : ctg.numID, //个数id
			_maxNum : ctg.maxNum, //最大个数
			_yaoBtn : ctg.yaoBtn //摇起来按钮ID
        };

        if( !(this instanceof Yao) ){
            return new Yao( ctg );
        }
		this.init();
    }

    Yao.prototype = {
        pointer : [ 1,2,3,4,5,6 ],
        Q       :function( id ){
                     return typeof id =="string" ? document.getElementById(id) : id;
        },
        createPointer : function (){
            var self = this,
                _container = self.Q( self.setting._area );
            if( _container.getElementsByClassName( self.setting._class ).length >0 ){
                _container.innerHTML = "";
            }

            var _dfrag = document.createDocumentFragment();

            for ( var i=0;i< self.setting._num;i++){
                 var _dpoint = document.createElement('div');
                 _dpoint.id = self.setting._class + i;
                 _dpoint.className = self.setting._class;
                 var _pointerNum = Math.random();
                 _dpoint.innerHTML = '<div class="is"><img src="images/pointer/'+self.pointer[ Math.floor( _pointerNum * self.pointer.length) ]+'.png"/><\/div>';
                 _dfrag.appendChild(_dpoint);
            }
            _container.appendChild(_dfrag);
			self.setPos();
			
        },
		setPos : function(){
			var self = this,
				_container = self.Q( self.setting._area ),
				_objArray = _container.getElementsByClassName( self.setting._class );
				for ( var i = 0;i< _objArray.length;i++){
					self.reSetPos(_objArray[i]);
				}
		},
		reSetPos : function(obj){
			var self = this,
				_container = self.Q( self.setting._area ),
				_containerWidth = parseInt( self.getCss( _container,"width") ),
                _containerHeight = parseInt( self.getCss( _container,"height") ),
				_dpLeft = Math.floor( Math.random() * _containerWidth ),
                _dpTop = Math.floor( Math.random() * _containerHeight ),
				_pointerWidth = parseInt( self.getCss( obj,'width' )),
				_pointerHeight = parseInt ( self.getCss( obj,'height' ));
				console.log( _pointerWidth )
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
		},
        getCss : function( obj,property ){
            if( obj.currentStyle ){
                return obj.currentStyle[ property ];
            }else if( window.getComputedStyle ){
                var prop = property.replace(/([A-Z])/g, "-$1");
                prop = property.toLowerCase();
                return document.defaultView.getComputedStyle(obj,null)[ property ];
            }
        },
		addEvent : function( target,type,fn){
			return target.addEventListener( type,fn,false);
		},
		subtraction : function(){
			var self = this;
			self.addEvent( self.Q( self.setting._subtraBtn ),"click",function(){
				if( self.Q( self.setting._numId ).innerHTML <= 1 ){
					alert('已经达到最小个数了');
				}else{
					self.Q( self.setting._numId ).innerHTML--;
				}
				self.setting._num = self.Q( self.setting._numId ).innerHTML ;
				navigator.vibrate(1000);
			})
		},
		add : function(){
			var self = this;
			self.addEvent( self.Q( self.setting._addBtn ),'click',function(){
				if( self.Q( self.setting._numId ).innerHTML >= self.setting._maxNum ){
					alert('已经达到最大个数了');
				}else{
					self.Q( self.setting._numId ).innerHTML++;
				}
				self.setting._num = self.Q( self.setting._numId ).innerHTML ;
				navigator.vibrate(1000);
			})
		},
		init : function(){
			var self = this;
			self.Q( self.setting._numId ).innerHTML = self.setting._num;
			self.subtraction();
			self.add();
			self.addEvent( self.Q( self.setting._yaoBtn ),'click',function(){
				self.createPointer();
				navigator.vibrate(1000);
			});
			self.addEvent( window,'load',function(){
				self.addEvent('body','touchmove',function(event){
					 event.preventDefault();
				})
			});
			self.addEvent( window,'devicemotion',function(event){
					var x = event.accelerationIncludingGravity.x,
						y = event.accelerationIncludingGravity.y,
						z =event.accelerationIncludingGravity.z;
					if( x >=5 || y >=5 || z>=5 ){
						setTimeout(function(){ self.createPointer(); },500)
					}
				})
		}
    };