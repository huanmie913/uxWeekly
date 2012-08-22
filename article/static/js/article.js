/*
 * To: article/
 * Time:2012-08-13
 * authro :情封
* */

var Article = Article || {};
Article.sidebar = {
	CONFIG : {
		sideID : 'js-side', /*左侧ID*/
		targetClass : 'ar_item' /*目标对象类名*/
	},
	tpl : function(obj){
		var that = this,
			_ocontent = obj["content"],
			_sideDiv = document.createElement('div');
		_sideDiv.className = that.CONFIG.targetClass;
		_sideDiv.setAttribute("data-id",obj.id);
		var _html = '<h2>'+_ocontent.title+'</h2>';
		_html +=	'<div class="info">';
		_html +=		'<span class="name"><img src="'+_ocontent.avatar+'"/>'+_ocontent.author+'</span>';
		_html +=		'<time>'+_ocontent.time+'</time>';
		_html +=	'</div>';
		_sideDiv.innerHTML = _html;
		return _sideDiv;
	},
	sideRender : function(data){
		var that = this,_flagment = document.createDocumentFragment();
		for(var ai = 0;ai<data.length;ai++){
			_flagment.appendChild(that.tpl( data[ai] ));
		}
		document.getElementById( that.CONFIG.sideID ).appendChild(_flagment);
	},
	ajaxRender : function(data,n){
		var _content = data[n]['content'];
		 var _from = _content.from,
			_author = _content.author,
			_source = _content.url;
		var _html = '<header class="ar_header">';
			_html += '    <a class="source" href="'+_source+'" target="_blank">查看原文</a>';
			_html += '<div class="info"><span>作者:'+_author+'</span></div>';
			_html += '	</header>';
		return _html;
	},
	getParent : function(element){
		var _parent=element.parentNode;
		return _parent && _parent.nodeType!=11 ? _parent : null;
	},
	index : function(num,data){
		for(var ai = data.length-1;ai>=0;ai--){
			var _id = data[ai].id;
			if( _id == num ){
				return ai;
			}	
		}
	},
	createLoading : function(){
		var loading = document.createElement('div');
		loading.className = "loading";
		loading.id = "js-loading";
		document.getElementById('js-content').appendChild(loading);
	},
	clickAjax : function(data){
		var that = this,
			_jsContent = document.getElementById('js-content');
		document.getElementById( that.CONFIG.sideID ).addEventListener('click',function(e){
			e.stopPropagation();
			var _target = e.target,_element = null;
			
			var _targetClass = _target.className;
			if( _targetClass == that.CONFIG.targetClass ){
				_element = _target;
			}else{
				var _parent = that.getParent(_target);
				if( _targetClass == that.CONFIG.targetClass ){
					_element = _parent;
				}else{
					_element = that.getParent(_parent);
				}
			}
			
			var idPro = _element.getAttribute('data-id');
			var index = that.index(idPro,data);
			if( index == undefined){
				return;
			}
			
			var _url = data[index]['content']['ajaxcontent']['ajaxSource'];
			var _html = that.ajaxRender(data,index);
			var _tagName = document.getElementById( that.CONFIG.sideID ).querySelectorAll(that.CONFIG.targetClass);
			for(var ci = data.length-1;ci>=0;ci--){
				_tagName[ci].className = (ci==index) ? that.CONFIG.targetClass+" current" : that.CONFIG.targetClass ;
			}
			if(data[index]['content']['ajaxcontent']['ajaxFlag']){
				that.createLoading();
				Ajax.doAjax("GET",_url,true,function(txt){
					_html += '<div class="ar_content">';
					_html += txt;
					_html +='</div>';
					_jsContent.removeChild(document.getElementById('js-loading'));
					_jsContent.innerHTML = _html;
				});
			}else{
				window.open("/article/page/"+idPro+".html");
			}
			window.location.href="#"+idPro;
		},false);
	},
	init : function(articleData){
		this.sideRender(articleData);
		this.clickAjax(articleData);
	}
};

Article.fullScreen = {
	setFullScreen : function(){
		document.getElementById('js-fullscreen').onclick = function(e){
			document.getElementById('js-content').webkitRequestFullScreen();
			e.stopPropagation();
		}
	},
	exitFullScreen : function(){
		document.onclick = function(){
           document.webkitCancelFullScreen();
       }
	},
	init : function(){
		this.setFullScreen();
		this.exitFullScreen();
	}
}




