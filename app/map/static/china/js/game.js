/*
 * time : 2012-09-04
 * author : 情封
*/

/*Ajax*/
(function(win,undefined){
    win.QF = win.QF || {};
    win.QF.ajax = {
        // IE7以上、Firefox、Chrome、Opera、Safari支持本地Javascript对象。
    createXHR:function(){
        if( typeof XMLHttpRequest !="undefined" ){
            return new XMLHttpRequest();
        }else if( typeof ActiveXObject != "undefined"){       
            if( typeof arguments.callee.activeXString != "string" ){
                var versions=[ "MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp" ];
                for( var i=0,len=versions.length;i<len;i++ ){
                    try{
                        var xhr= new ActiveXObject( versions[i] );
                        arguments.callee.activeXString = versions[i];
                        return xhr;
                    }catch(ex){}
                }
            }
              return new ActiveXObject( arguments.callee.activeXString );
            }else{
               throw new Error( "No xhr object available.")
            }
        },
    responseType:function( request ){
        var _responseType = request.getResponseHeader("Content-Type");
        switch( _responseType ){
            case "text/xml" :
                return request.responseXML;
            case "text/json" :
            case "text/javascript":
            case "application/javascript":
            case "application/x-javascript":
                 return eval("(" + request.responseText + ")");
            default:
                return request.responseText;
        }
    },
    encodeFormData:function( data ){
        var _pairs = [];
        var _regexp = /%20/g;
        for( var name in data){
            var _value = data[ name ].toString();
            var _pair = encodeURIComponent( name ).replace(_regexp,"+") + "=" + encodeURIComponent( _value ).replace(_regexp,"+");
            _pairs.push(_pair);
        }
        return _pairs.join("&");
    },
    /*
    * method: GET 、 POST
    * url: 请求的地址
    * asyn : 请求方式( false:同步、true: 异步 )
    * value : POST 请求附带的参数
    * callback :请求成功回调函数
    * errorHandle :请求失败回调函数
    * */
    doAjax:function( method,url,asyn,value,callback,errorHandle ){
        var _xhr = win.QF.ajax.createXHR();
        _xhr.onreadystatechange=function(){
            if( _xhr.readyState == 4 ){
                if( _xhr.status >= 200 && _xhr.status < 300 || _xhr.status == 304 ){
                    callback( win.QF.ajax.responseType( _xhr ) );
                }else{
                    if( errorHandle ){
                        errorHandle( _xhr.status,_xhr.statusText );
                    }else{
                        callback( null );
                    }
                }
            }
        };
       _xhr.open(method,url,asyn);
        if( method == "GET" ){
            _xhr.send( null );
        }else if( method=="POST" ){
            _xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            _xhr.send( Ajax.encodeFormData(value) );
        }
    }
}
    win.QF.ajax.doAjax = QF.ajax.doAjax;
})(window);


(function(win,undefined){
    var doc = win.document;
    var _initNum = 267342912;
    var _timer = 2000;
    var _opacity = 100;
    var gameIndex = {};
    var _idNum = 0;
	var sflag = 0; // 1表示清除本地缓存，0表示不清除
    gameIndex.$ = function(id){
        return typeof id == "string" ? doc.getElementById(id) : id; 
    };
    gameIndex.getCSS = function(element,attr){
        if(element.style[attr]){
            return element.style[attr];
        }else if(element.currentStyle){
            return element.currentStyle[attr];
        }else if(document.defaultView && document.defaultView.getComputedStyle){
            attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
            return document.defaultView.getComputedStyle(element,null).getPropertyValue(attr);
        }else{
            return null;
        }
    };
    gameIndex.show = function(obj){
        if(_opacity>=100){
            gameIndex.hide(obj);
        }else{
            setTimeout(arguments.callee,10);
        }
        _opacity+=20;
        obj.style.opacity = (_opacity/100).toFixed(1);
    };
    gameIndex.hide = function(obj){
        if(_opacity<=0){
            gameIndex.show(obj);
        }else{
            setTimeout(arguments.callee,10);
        }
        _opacity-=20;
        obj.style.opacity = (_opacity/100).toFixed(1);
    };

    //省市热度
    gameIndex.initArea = function(jsonData,state,pathObj,st,R){
        var provinceArea = {}
        provinceArea.orderProvince = function(){
            var _tmpProvince = [];
            for( var prop in jsonData ){
                if(jsonData.hasOwnProperty(prop)){
                    var _tmpJson = jsonData[prop];
                    _tmpProvince.push(_tmpJson.w +"|"+_tmpJson.brief);
                }
            }
            //倒序
            _tmpProvince.sort(function(a,b){
                return parseInt(b)-parseInt(a);
            });
            for(var j=0,len = _tmpProvince.length;j<len;j++){
				provinceArea.colorDepth(_tmpProvince[j]); 
            }
        };
        provinceArea.colorDepth = function(obj){
            var _tmpObj = obj.split('|'),
                _proNameId = _tmpObj[1],
                _hotValue = _tmpObj[0],
                _opacity = 0;
			if( state == _proNameId ){
				switch(true){
					case _hotValue <= 3 :
						 _opacity = 0.2;
						 break; 
					case _hotValue <= 5 :
						 _opacity = 0.4;
						 break;
					 case _hotValue <= 6 :  
						 _opacity = 0.6;
						 break;
					case _hotValue <= 7 :  
						 _opacity = 0.7;
						 break; 
					case _hotValue <= 8 :  
						 _opacity = 0.8;
						 break;
					case _hotValue <= 9 :  
						 _opacity = 0.9;
						 break;
					default :
						 _opacity = 1;
			   }
			   //pathObj.animate({fill: "#000", stroke: "#000"}, 500);
			   st.animate({fill: st.color, stroke: "#fdb913",opacity:_opacity}, 500);
			   st.toFront();
			   R.safari();
			}			
        };
        provinceArea.init = function(){
            provinceArea.orderProvince();
        };
        provinceArea.init();
        return provinceArea;
    };
    //省市游戏
    gameIndex.initPop = function(jsonData){
        var gamePop = {};
        gamePop.setPosition =  function(id,position){
            var _indexPop = gameIndex.$(id+"_pop");
                _objWidth = parseInt( gameIndex.getCSS(_indexPop,"width") );
                _objHeight = parseInt( gameIndex.getCSS(_indexPop,"height") );

            _indexPop.style.left = position['x'] - (_objWidth/2)+"px";
            _indexPop.style.top = position['y'] - (_objHeight/2)+"px";
        };
        gamePop.tpl = function(obj){
            var _str = "";
            var _html = doc.createElement("div");
                _html.className = "indexPop showPop";
                _html.id = obj['province']+"_pop";
                _str = '<ul>';
                _str += '<li><img id="imgSrc" src="'+obj['icon']+'"/><span id="imgName" class="imgName">'+obj['game']+'</span></li>';
                _str += '<li>'+obj['_name']+'</li></ul>';
                _html.innerHTML = _str;
            return _html;
        };
        gamePop.rendHtml = function(data){
            var _provinceName = data['place'],
                _position = {'x':data['x'],'y':data['y']},
                _name = data['name'];
                
            var _interTimer = null;

            //存在省份,替换游戏图标地址与游戏名称
            if(gameIndex.$(_provinceName+"_pop") != null){
                clearTimeout(_interTimer);
                var _element = gameIndex.$(_provinceName+"_pop"),
                    _parentNode = _element.parentNode;
                if( _parentNode !=null){
                    _parentNode.removeChild(_element);
                    var _ngameIcon = data['icon'],
                        _ngameName = data['game'];
                    var _html = gamePop.tpl({'game':_ngameName, '_name' : _name, 'province':_provinceName,'icon':_ngameIcon,'pos':_position});
                }
            }else{
                var _gameName = data['game'],
                    _gameIcon = data['icon'];
                var _html = gamePop.tpl({'game':_gameName, '_name' : _name, 'province':_provinceName,'icon':_gameIcon,'pos':_position});   
            }
            
            gameIndex.$('gameMap').appendChild(_html); 
            gamePop.setPosition(_provinceName,_position);
            _interTimer = setTimeout(function(){
                var _obj = gameIndex.$(_provinceName+"_pop");
                if( _obj != null ){
                    _obj.parentNode.removeChild(_obj);
                }
            },5000);
        };
        gamePop.init = function(){
            gamePop.rendHtml(jsonData);
        }
        gamePop.init();
        return gamePop;
    };
    //计算全球用户
    gameIndex.initNum = function(){
            var updateNum = {};
            updateNum.numFormat = function(n){
                var _nstr = n.toString(),_ntmp = [];
                for( var i = 0,len = _nstr.length;i<len;i++){
                    if(i%3 == 0){
                        var _substr = _nstr.substring(i,i+3);
                        _ntmp.push(_substr);
                    }
                }
                return _ntmp.join(",");
            };
            updateNum.localstorage = {
                get : function(key){
                    return win.localStorage.getItem(key);
                },
                set : function(key,value){
                    win.localStorage.setItem(key,value);
                },
				clear : function(key){
					win.localStorage.removeItem(key);
				}
            };
            updateNum.init = function(){
				if( sflag == 1 ){
					updateNum.localstorage.clear('upnum');
					sflag = 0;
				}
				_num = parseInt(updateNum.localstorage.get('upnum')) || _initNum;
                setInterval(function(){
                    var _randNum = Math.floor(Math.random()*1000+1);
                    _num += _randNum;
                    gameIndex.$("j_total").innerHTML = updateNum.numFormat(_num);
					updateNum.localstorage.set('upnum',_num);
                },_timer/2);
            }
			updateNum.init();
            return updateNum;
        },
    win.gameIndex = gameIndex;
})(window);

