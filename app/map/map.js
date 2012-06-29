/*
 * To: 游戏指数
 * Dev: 情封
 * Time : 2012-06-28
*/


var gameIndex = [
    			{
    				"area":["fj_pt","福建莆田",100],
    				"game":["造梦西游|150","三国小镇|10"],
    				"time" : ["周天|150"]
    			},
    			{
    				"area":["hn_sy","海南三亚",210],
    				"game":["神魔遮天|50","海贼王|10"],
    				"time" : ["星期一|50"]
    			},
                {
                    "area":["xz_ls","西藏拉萨",150],
                    "game":["穿越三国|100","神魔斗|101"],
                    "time" : ["星期二|10"]
                },
                {
                    "area":["sc_cd","四川成都",320],
                    "game":["斗圣|580","飘渺西游|101"],
                    "time" : ["星期二|10"]
                }
    		];

(function(win,undefined){
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
    	this._ArrExit = []
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
    	//处理结构
    	tpl : function(data){
    		var that = this;
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
    			that.hide(data["area"][0]);
		    },that.option.timer);
    	},
    	hide:function(id){	
    		var that = this;
    		var _indexPop = that.$(id).querySelector('.indexPop');
    			_indexPop.style.display = "none";
    	},
    	orderProvince : function(){
    		var that = this;
    		for(var j = 0,_len = that.option.dataJson.length;j<_len;j++){
    			if( that.hasObject(that._Arrtmp,that.option.dataJson[j]["area"][0])){
    				var _dataJson = that.option.dataJson[j];
    				that._ArrExit.push(_dataJson["area"][2]+"|"+_dataJson["area"][1]+"|"+j);
    				//根据地区热度倒序排行
    				that._ArrExit.sort(function(a,b){
    					return parseInt(b)-parseInt(a);
    			     });
		        }
    	    };
            that.renderTo();
    	},
    	renderTo : function(){
    		var that = this,
    			_dataId = 0,
                x = 0,
                len = that._ArrExit.length;
            function getArg(){
                if( x<len ){
                    setTimeout(arguments.callee,that.option.timer);
                        _dataId = that.option.dataJson[that._ArrExit[x].split("|")[2]];
                         that.tpl(_dataId);
                }else{
                        that.initialization();
                }
                    x++;
            }
            getArg();
    	},
    	initialization : function(){
    		var that = this;
    		var _provinceArr = that.$(that.option.container).querySelectorAll("."+that.option.provinceName);
    		for( var i = 0,len =_provinceArr.length;i<len;i++ ){
    				that._Arrtmp.push(_provinceArr[i].getAttribute("id"));
    		};
    		that.orderProvince();
    	}
    }
    win.GameIndex = GameIndex;
})(window);