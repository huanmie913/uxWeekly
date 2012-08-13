/*
 * To: article/
 * Time:2012-08-13
 * authro :情封
* */

var Ajax=Ajax || {};

Ajax={
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
	doAjax:function( method,url,asyn,callback,errorHandle,value ){
		var _xhr = Ajax.createXHR();
        _xhr.onreadystatechange=function(){
            if( _xhr.readyState == 4 ){
                if( _xhr.status >= 200 && _xhr.status < 300 || _xhr.status == 304 ){
                    callback( Ajax.responseType( _xhr ) );
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
};


var Article = Article || {};
Article.sidebar = {
	tpl : function(obj){
		var _ocontent = obj["content"];
		var _sideDiv = document.createElement('div');
			_sideDiv.className = "ar_item";
			_sideDiv.setAttribute("data-id",obj.id);
			_sideDiv.setAttribute("data-action","Article.sidebar.ajaxRender");
		var _html = '<h2>'+_ocontent.title+'</h2>';
		_html +=	'<div class="info">';
		_html +=		'<span class="name">'+_ocontent.author+'</span>';
		_html +=		'<time>'+_ocontent.time+'</time>';
		_html +=	'</div>';
		_sideDiv.innerHTML = _html;
		document.getElementById('js-side').appendChild(_sideDiv);
	},
	sideRender : function(data){
		for(var ai = data.length-1;ai>=0;ai--){
			this.tpl( data[ai] );
		}
	},
	ajaxRender : function(data,n){
		var _content = data[n]['content'];
		var _from = _content.from,
			_author = _content.author,
			_source = _content.source;
		var _html = '<header class="ar_header">';
		_html += '    <a class="source" href="'+_source+'">查看原文</a>';
		_html += '		<div class="info"><span>来源:'+_from+'</span><span>作者:'_author'</span></a>';
		_html += '	</header>';
		return _html;
		//document.getElementById('js-content').innerHTML = _html;
	},
	getParent : function(element){
		var _parent=element.parentNode;
		return _parent && _parent.nodeType!=11 ? _parent : null;
	},
	clickAjax : function(data){
		var that = this;
		document.getElementById('js-side').onclick = function(e){
			var _target = e.targket;
			var _parent = that.getParent(_target);
			if(_parent.className !="ar_item"){
				return;
			}
			var idPro = _parent.getAttribute('data-id'),
				actionPro = _parent.getAttribute('data-action');
			for(var ai = data.length-1;ai>=0;ai--){
				var _id = data[ai].id;
				if( _id != idPro ){
					break;
				}
				Ajax.doAjax("GET",data[ai]['ajaxcontent']['ajaxSource'],true,function(txt){
					actionPro(ai);
				});
			}
			
		}
	},
	init : function(articleData){
		this.sideRender(articleData);
		this.clickAjax(articleData);
	}
}



