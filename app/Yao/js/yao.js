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

            var _dfrag = document.createDocumentFragment(),
                _containerWidth = parseInt( self.getCss( _container,"width") ),
                _containerHeight = parseInt( self.getCss( _container,'height') );

            for ( var i=0;i< self.setting._num;i++){
                 var _dpoint = document.createElement('div');
                 _dpoint.id = self.setting._class + i;
                 _dpoint.className = self.setting._class;
                 var _pointerNum = Math.random();
                 _dpoint.innerHTML = '<div class="is"><img src="images/pointer/'+self.pointer[ Math.floor( _pointerNum * self.pointer.length) ]+'.png"/><\/div>';
                 var _dpLeft = Math.floor( Math.random() * _containerWidth ),
                     _dpTop = Math.floor( Math.random() * _containerHeight );

                //色子的宽高
                 var _pointerWidth = parseInt( self.getCss(_dpoint,'width')),
                     _pointerHeight = parseInt ( self.getCss(_dpoint,'height'));

                //色子水平坐标
                 if( _dpLeft + _pointerWidth > _containerWidth ){
                     _dpoint.style.left = ( _containerWidth - _pointerWidth )+"px";
                 }else{
                     _dpoint.style.left = _dpLeft +"px";
                 }

                 //色子垂直坐标
                 if ( _dpTop + _pointerHeight > _containerHeight ){
                     _dpoint.style.top = ( _containerHeight - _pointerHeight )+"px";
                 }else{
                     _dpoint.style.top = _dpTop+"px";
                 }

                 _dfrag.appendChild(_dpoint);
            }
            _container.appendChild(_dfrag);
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