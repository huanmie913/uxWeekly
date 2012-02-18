/*
* 桌游助手
* f2er
* 12-02-16
* */

 function Yao( ctg ){
        this.setting = {
            _area : ctg.container, //容器ID
            _num : ctg.num, //色子个数
            _class : ctg.cn //色子class
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
					self.resetPos(_objArray[i]);
				}
		},
		resetPos : function(obj){
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
        init : function(){
            var self = this;
            self.createPointer();
        }
    };