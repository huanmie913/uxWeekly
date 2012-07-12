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
    		timer : 2000,
            backgroundColorName : "255,255,255",
            listId : "j-gameList"
    	}
    	if( !(this instanceof arguments.callee)){
    		return new arguments.callee(ctg);
    	}
    	this._Arrtmp = [];
    	this._ArrExit = [];
        this._initFlag = false;
        this.initialization();
    }
    GameIndex.prototype = {
    	constructor : GameIndex,
    	$ : function(id){
    		return typeof id == "string" ? doc.getElementById(id) : id;
    	},
    	//检测目标对象是否存在数组中
    	hasObject : function(source,target){
    		if({}.toString.call(source) == "[object Array]"){
    			for( prop in source ){
    				if( source[prop] == target ){
    					return true;
    				}
    			}
    		}
    		return false;
    	},
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
            that.$("j_total").innerHTML = numFormat(_num);
            setInterval(function(){
                var _randNum = Math.floor(Math.random()*10+1);
                _num += _randNum;
                that.$("j_total").innerHTML = numFormat(_num);  
            },that.option.timer);
        },
        //数字时间戳 转换 日期时间
        timeFormat : function(format){
            var that = this;
            var _date = that.option.dataJson[0].timestamp;

            var date = new Date(_date);
            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
            var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
            var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
            var _str =  date.getFullYear() + format + month + format + currentDate+" "+hh + ":" + mm;

            that.$("date").innerHTML = _str;
            return that;
        },
        //颜色深浅
        colorDepth : function(id,depth){
            var that = this,_totalColor = 0,_colorDepth = 0;
            for( var n =0,len = that._ArrExit.length;n<len;n++){
                _totalColor += parseInt(that._ArrExit[n].split("|")[0]);
            }  
          // that.$(id).style.backgroundColor = "rgba("+that.option.backgroundColorName+","+(depth/_totalColor).toFixed(2)+")";
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
           that.$(id).style.opacity = opacity;
           //that.$(id).style.opacity = "rgba("+that.option.backgroundColorName+","+opacity+")";
        },
        //数据列表
        dataList : function(){
          var that = this,_flagment = doc.createDocumentFragment(),_totalColor=0;
          var _infoJson = that.option.dataJson[2].info;
          if( typeof(that.option.listId) == "string"){
              for( var n =0,len = that._ArrExit.length;n<len;n++){
                    _totalColor += parseInt(that._ArrExit[n].split("|")[0]);
                }  
              for(var i=0,len = that._ArrExit.length;i<len;i++){
                    var _tmpObj = _infoJson[that._ArrExit[i].split("|")[2]];
                    var tr = document.createElement("tr");
                    var tdarea = document.createElement("td");
                    var tdgame = document.createElement("td");
                    var tdtime = document.createElement("td");
                    var tdratio = document.createElement("td");
                    var areaTd = doc.createTextNode( _tmpObj["area"][1]);
                    var gameTd = doc.createTextNode( _tmpObj["game"]);
                    var timeTd = doc.createTextNode( _tmpObj["time"]);
                    var colorDepth = _tmpObj["area"][2];
                    var ratioDiv = doc.createElement("div"),
                        _ratio = ((colorDepth/_totalColor)*100).toFixed(2)+"%";
                    ratioDiv.className = "rd";
                    ratioDiv.style.width = _ratio;
                    ratioDiv.innerHTML = _ratio;
                    tdarea.appendChild(areaTd);
                    tdgame.appendChild(gameTd);
                    tdtime.appendChild(timeTd);
                    tdratio.appendChild(ratioDiv);

                    tr.appendChild(tdarea);
                    tr.appendChild(tdgame);
                    tr.appendChild(tdtime);
                    tr.appendChild(tdratio);
                    _flagment.appendChild(tr);
              }  
              that.$(that.option.listId).appendChild(_flagment);
          }
          return that;
        },
    	//模板
    	tpl : function(data){
    		var that = this,
                colorDepth = 0;
            var _str = "";
            var _html = doc.createElement("div");
                _html.className = "indexPop";
                _html.id = data["area"][0]+"_pop";
                /*_str = '<ul><li>地区:'+data["area"][1]+'</li>';
                _str += '<li>游戏:';
                    for( var i = 0,len = data["game"].length;i<len;i++){
                        _str +=data["game"][i].split("|")[0]+","
                    }
                _str += '</li><li>时间段:'+data["time"][0].split("|")[0]+'</li>';
                _str += '</ul>';*/
                _str = '<ul><li>'+data["area"][1]+'</li>';
                _str += '<li>';
                    for( var i = 0,len = data["game"].length;i<len;i++){
                        _str +=data["game"][i].split("|")[0];
                    }
                _str += '</li>';
                _str += '</ul>';
                _html.innerHTML = _str;
            that.$(that.option.container).appendChild(_html);
            var _ratio = data["area"][2];
            that.setPosition(data,_ratio);
    		//延迟消失
            setTimeout(function(){
                that.hideShow(data,0);
		    },that.option.timer);
            that.loopInterval();
    	},
        //获取元素属性
        getCSS : function(element,attr){
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
        },
        //确定提示位置
        setPosition : function(data,r){
            var that = this,_totalColor = 0;
            /*for( var n =0,len = that._ArrExit.length;n<len;n++){
                _totalColor += parseInt(that._ArrExit[n].split("|")[0]);
            } */
           // var _indexPop = that.$(data["area"][0]).querySelector('.indexPop');
            var _indexPop = that.$(data["area"][0]+"_pop");
            var _objWidth = parseInt( that.getCSS(_indexPop,"width") );
            var _objHeight = parseInt( that.getCSS(_indexPop,"height") );
            _indexPop.style.left = data["position"]["x"] - (_objWidth/2)+"px";
            _indexPop.style.top = data["position"]["y"] - (_objHeight/2)+"px";

            /*_indexPop.style.width = parseInt( (_objWidth * r/_totalColor))+"px";
            _indexPop.style.height = parseInt( (_objHeight * r/_totalColor))+"px";*/
        },
        //显示隐藏提示框
    	hideShow:function(data,flag){	
    		var that = this;
    		//var _indexPop = that.$(data["area"][0]).querySelector('.indexPop');
            var _indexPop = that.$(data["area"][0]+"_pop");
            _indexPop.style.display = ( flag ==0 ) ? "none" : "block";
    	},
        //根据地区热度倒序排行
    	orderProvince : function(){
    		var that = this;
            var _infoJson = that.option.dataJson[2].info;
    		for(var j = 0,_len = _infoJson.length;j<_len;j++){
    			if( that.hasObject(that._Arrtmp,_infoJson[j]["area"][0])){
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
            function getArg(){
                if( x<len ){
                  timer = setTimeout(arguments.callee,that.option.timer);
                  var _infoJson = that.option.dataJson[2].info;
                  _dataId = _infoJson[that._ArrExit[x].split("|")[2]];
                  that.tpl(_dataId);
                }
                x++;
            }
            getArg();
    	},
        loopInterval : function(){
            var that = this,
                _num = 0;
            function count(){
                if(_num>=that._ArrExit.length){
                   that._initFlag = true;
                   that.initialization(); 
                   that._num = 0;
                }else{
                    setTimeout(arguments.callee,that.option.timer);
                     _num++;
                }
            }
            count();
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
        reInit : function(id){
            var that = this,
                m = 0,
                timer = null;
            function showPop(){
                if(m<that._ArrExit.length){
                    timer = setTimeout(arguments.callee,that.option.timer/2);
                    //var id = that.option.dataJson[that._ArrExit[m].split("|")[2]]["area"][0];
                    var _infoJson = that.option.dataJson[2].info;
                    var id = _infoJson[that._ArrExit[m].split("|")[2]];
                    that.hideShow(id,1);
                    //延迟消失
                    setTimeout(function(){
                        that.hideShow(id,0);
                    },that.option.timer);
                }
                m++;
            }
            showPop();
            //clearTimeout(_timer);
            that.loopInterval();
        },
    	initialization : function(){
    		var that = this;
            if( that._initFlag == true ){
                that.reInit();
                return;
            }
    		var _provinceArr = that.$(that.option.container).querySelectorAll("."+that.option.provinceName);
    		for( var i = 0,len =_provinceArr.length;i<len;i++ ){
    			that._Arrtmp.push(_provinceArr[i].getAttribute("id"));
    		};
            
    		that.orderProvince();   
            return that;
    	}
    }
    win.GameIndex = QF.GameIndex = GameIndex;
})(window,QF);