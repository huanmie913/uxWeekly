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
            backgroundColorName : "255,0,0",
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
        //颜色深浅
        colorDepth : function(id,depth){
            var that = this,_totalColor = 0,_colorDepth = 0;
            for( var n =0,len = that._ArrExit.length;n<len;n++){
                _totalColor += parseInt(that._ArrExit[n].split("|")[0]);
            }  
            that.$(id).style.backgroundColor = "rgba("+that.option.backgroundColorName+","+(depth/_totalColor).toFixed(2)+")";
        },
        //数据列表
        dataList : function(){
          var that = this,_flagment = doc.createDocumentFragment(),_totalColor=0;
          if( typeof(that.option.listId) == "string"){
              for( var n =0,len = that._ArrExit.length;n<len;n++){
                    _totalColor += parseInt(that._ArrExit[n].split("|")[0]);
                }  
              for(var i=0,len = that._ArrExit.length;i<len;i++){
                    var _tmpObj = that.option.dataJson[that._ArrExit[i].split("|")[2]];
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
        },
    	//模板
    	tpl : function(data){
    		var that = this,
                colorDepth = 0;
    		var _html = '<div class="indexPop"><ul>';
    			_html += '<li>地区:'+data["area"][1]+'</li>';
    			_html += '<li>游戏:';
    				for( var i = 0,len = data["game"].length;i<len;i++){
    					_html +=data["game"][i].split("|")[0]+","
    				}
    			_html += '</li><li>时间段:'+data["time"][0].split("|")[0]+'</li>';
    			_html += '</ul></div>';
            
    		that.$(data["area"][0]).innerHTML=_html;
    		//延迟消失
            setTimeout(function(){
    			that.hideShow(data["area"][0],0);
		    },that.option.timer);
            that.loopInterval();
    	},
    	hideShow:function(id,flag){	
    		var that = this;
    		var _indexPop = that.$(id).querySelector('.indexPop');
            if(flag == 0){
    			_indexPop.style.display = "none";
            }else{
                _indexPop.style.display = "block";
            }
    	},
        //根据地区热度倒序排行
    	orderProvince : function(){
    		var that = this;
    		for(var j = 0,_len = that.option.dataJson.length;j<_len;j++){
    			if( that.hasObject(that._Arrtmp,that.option.dataJson[j]["area"][0])){
    				var _dataJson = that.option.dataJson[j];
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
                  _dataId = that.option.dataJson[that._ArrExit[x].split("|")[2]];
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
        initColor : function(){
            var that = this,
                dataObj = null,
                colorDepth = 0;
            for( var m = 0,len = that._ArrExit.length;m<len;m++){
                data = that.option.dataJson[that._ArrExit[m].split("|")[2]];
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
                    timer = setTimeout(arguments.callee,that.option.timer);
                    var id = that.option.dataJson[that._ArrExit[m].split("|")[2]]["area"][0];
                    that.hideShow(id,1);
                    //延迟消失
                    setTimeout(function(){
                        that.hideShow(id,0);
                    },that.option.timer);
                }
                m++;
            }
            showPop();
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