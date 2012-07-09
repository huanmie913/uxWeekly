/*
 * To: 游戏指数
 * Dev: 情封
 * Time : 2012-06-28
*/

var QF = QF || {};

(function(win,QF,undefined){
    var doc = win.document;
    function GameIndex(ctg){
    	this.option = {
    		dataJson : gameIndex,
    		provinceName : "province",
    		container : "gameMap",
    		timer : 2000
    	}
    	if( !(this instanceof arguments.callee)){
    		return new arguments.callee(ctg);
    	}
    	this._Arrtmp = [];
    	this._ArrExit = [];
        this._initFlag = false;
        this._num = 0;
        this.initialization();
    }
    //获取元素css
    GameIndex.getCSS =  function(element,attr){
            var that = this;
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
    }

    //根据ID类型获取元素
    GameIndex.$ = function(id){
        return typeof id == "string" ? doc.getElementById(id) : id;
    }

    //检测目标对象是否存在数组中
    GameIndex.hasObject = function(source,target){
        if({}.toString.call(source) == "[object Array]"){
            for( prop in source ){
                if( source[prop] == target ){
                    return true;
                }
            }
        }
        return false;
    }

    GameIndex.prototype = {
    	constructor : GameIndex,
        updateTotal : function(){
            var that = this;
            var _num = that.option.dataJson[1].initnum;
            function numFormat(n){
                var _nstr = n.toString(),_ntmp = [];
                for( var i = 0,len = _nstr.length;i<len;i++){
                    if(i%3 == 0){
                        var _substr = _nstr.substring(i,i+3);
                        _ntmp.push(_substr);
                    }
                }
                return _ntmp.join(",");
            }
            setInterval(function(){
                var _randNum = Math.floor(Math.random()*1000+1);
                _num += _randNum;
                GameIndex.$("j_total").innerHTML = numFormat(_num);  
            },that.option.timer/2);

            GameIndex.$("j_total").innerHTML = numFormat(_num);
        },
        //颜色深浅
        colorDepth : function(id,depth){
            var that = this,_totalColor = 0,_colorDepth = 0;  
           var caseOpactiy = depth;
           var opacity = 0;
           switch(true){
                case caseOpactiy <= 3 :
                     opacity = 0.2;
                     break; 
                case caseOpactiy > 3 && caseOpactiy <= 5 :
                     opacity = 0.4;
                     break;
                 case caseOpactiy > 5 && caseOpactiy <= 6 :  
                     opacity = 0.6;
                     break;
                case caseOpactiy > 6 && caseOpactiy <= 7 :  
                     opacity = 0.7;
                     break; 
                case caseOpactiy > 7 && caseOpactiy <= 8 :  
                     opacity = 0.8;
                     break;
                case caseOpactiy > 8 && caseOpactiy <= 9 :  
                     opacity = 0.9;
                     break;
                default :
                    opacity = 1;
           }
           GameIndex.$(id).style.opacity = opacity;
        },
        
    	//模板
    	tpl : function(data){
    		var that = this,zIndex = data["area"][2];
            var _str = "";
            var _html = doc.createElement("div");
                _html.className = "indexPop";
                _html.id = data["area"][0]+"_pop";
                _str = '<ul>';
                _str += '<li><img src="'+data["game"][1]+'"/></li>';
                _str += '<li>'+data["area"][1]+'</li></ul>';
                _html.innerHTML = _str;
            GameIndex.$(that.option.container).appendChild(_html);
            var _ratio = data["area"][2];
            that.setPosition(data,_ratio,zIndex);
            that._num++;
            that.Interval();
    	},
        //确定提示位置,根据火热程度确定层级
        setPosition : function(data,r,z){
            var that = this,
                _indexPop = GameIndex.$(data["area"][0]+"_pop");
                _objWidth = parseInt( GameIndex.getCSS(_indexPop,"width") );
                _objHeight = parseInt( GameIndex.getCSS(_indexPop,"height") );

            _indexPop.style.left = data["position"]["x"] - (_objWidth/2)+"px";
            _indexPop.style.top = data["position"]["y"] - (_objHeight/2)+"px";
            _indexPop.style.zIndex = z;
        },
        //根据地区热度倒序排行
    	orderProvince : function(){
    		var that = this;
            var _infoJson = that.option.dataJson[2].info;
    		for(var j = 0,_len = _infoJson.length;j<_len;j++){
    			if( GameIndex.hasObject(that._Arrtmp,_infoJson[j]["area"][0])){
    				var _dataJson = _infoJson[j];
    				that._ArrExit.push(_dataJson["area"][2]+"|"+_dataJson["area"][1]+"|"+j);
    				that._ArrExit.sort(function(a,b){
    					return parseInt(b)-parseInt(a);
    			     });
		        }
    	    };
            that.renderTo();
    	},
        //渲染模板
    	renderTo : function(){
    		var that = this,
    			_dataId = 0,
                x = 0,
                len = that._ArrExit.length,
                timer = null;
            var _infoJson = that.option.dataJson[2].info;
            function getArg(){
                if( x<len ){
                  timer = setTimeout(arguments.callee,0);
                  _dataId = _infoJson[that._ArrExit[x].split("|")[2]];
                  that.tpl(_dataId);
                }
                x++;
            }
            getArg();
    	},
        Interval : function(){
            var that = this;
            if(that._num>=that._ArrExit.length){
                that.reInit();
            }
        },
        //初始化颜色
        initColor : function(){
            var that = this,
                dataObj = null,
                colorDepth = 0;
            var _infoJson = that.option.dataJson[2].info;
            for( var m = 0,len = that._ArrExit.length;m<len;m++){
                data = _infoJson[that._ArrExit[m].split("|")[2]];
                colorDepth = data["area"][2];
                that.colorDepth(data["area"][0],colorDepth);
            }
            return that;
        },
        //渐隐渐显
        animateOpacity : function(id,h){
            var that = this,
                _opacity = 100,
                _totalColor = 0;
            //获取总数
            for( var n =0,len = that._ArrExit.length;n<len;n++){
                 _totalColor += parseInt(that._ArrExit[n].split("|")[0]);
            }

            //渐显
            function showOpacity(){
                if(_opacity>=100){
                    hideOpacity();
                }else{
                    setTimeout(arguments.callee,(h/_totalColor*20000).toFixed(1));
                }
                _opacity+=25;
                GameIndex.$(id).style.opacity = (_opacity/100).toFixed(1);
            }
            //渐隐
            function hideOpacity(){
                if(_opacity<=0){
                    showOpacity();
                }else{
                    setTimeout(arguments.callee,(h/_totalColor*20000).toFixed(1));
                }
                _opacity-=25;
                GameIndex.$(id).style.opacity = (_opacity/100).toFixed(1);
            }
            hideOpacity();
        },
        //根据不同的热度,闪烁程度不同
        reInit : function(id){
            var that = this,
                len = that._ArrExit.length,
                timer = null;
            var _infoJson = that.option.dataJson[2].info;
            for(var m=0;m<len;m++){
                var data = _infoJson[that._ArrExit[len-1-m].split("|")[2]],
                    _hot = data["area"][2];
                var id = data["area"][0]+"_pop";
                that.animateOpacity(id,_hot);
            }
        },
    	initialization : function(){
    		var that = this;
    		var _provinceArr = GameIndex.$(that.option.container).querySelectorAll("."+that.option.provinceName);
    		for( var i =_provinceArr.length-1;i>=0;i-- ){
    			that._Arrtmp.push(_provinceArr[i].getAttribute("id"));
    		};
    		that.orderProvince();   
            return that;
    	}
    }
    win.GameIndex = QF.GameIndex = GameIndex;
})(window,QF);