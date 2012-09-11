/*
 * To: article/
 * Time:2012-08-13
 * authro :情封
* */

var QProjectList = QProjectList || {};
QProjectList.sidebar = {
	tpl : function(obj){
		var _ocontent = obj["content"];
		var _sideDiv = document.createElement('div');
			_sideDiv.className = "pro_box";
			_sideDiv.setAttribute("data-id",obj.id);
		var _html = ' <div class="img_cover"></div> ';
			_html += '<h2>4399中国区用户分布图</h2>';
			_html += ' <ul class="desc"> ';
			_html += '	<li>创建时间:2012-09-21</li> ';
			_html += '	<li>项目状态:<span class="s_ing">进行中</span></li>';
			_html += '</ul>';
			_html += '<a href="#" class="a_site">立即体验&gt;&gt;</a>';	

		_sideDiv.innerHTML = _html;
		document.getElementById('js-plist').appendChild(_sideDiv);
	},
	sideRender : function(data){
		for(var ai = 0;ai<data.length;ai++){
			this.tpl( data[ai] );
		}
	},
	/*ajaxRender : function(data,n){
		var _content = data[n]['content'];
		 var _from = _content.from,
			_author = _content.author,
			_source = _content.url;
		var _html = '<header class="ar_header">';
			_html += '    <a class="source" href="'+_source+'" target="_blank">查看原文</a>';
			_html += '<div class="info"><span>作者:'+_author+'</span></div>';
			_html += '	</header>';
		return _html;
	},*/
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
	Dialog : function(id){
		var flag = false;
		if( flag == false ){
			document.getElementById(id).style.display  = "block";
			flag = true;
		}else{
			document.getElementById(id).style.display  = "none";
			flag = false;
		}
		document.getElementById('js-closed').onclick = function(){
			document.getElementById(id).style.display = "none";
			flag = false;
		}
	},
	clickAjax : function(data){
		var that = this;
		document.getElementById('js-plist').onclick = function(e){
			that.Dialog("js-prodialog");
			e.stopPropagation();
			var _target = e.target,_element = null;
			
			if(_target.className == "pro_box"){
				_element = _target;
			}else{
				var _parent = that.getParent(_target);
				if(_parent.className == "pro_box"){
					_element = _parent;
				}
				if(_parent.className !="pro_box"){
					_element = that.getParent(_parent);
				}
			}
			
			var idPro = _element.getAttribute('data-id');
			var index = that.index(idPro,data);
			if( index == undefined){
				return;
			}
			var _url = data[index]['content']['ajaxcontent']['ajaxSource'];
			//var _html = that.ajaxRender(data,index);
			var _tagName = document.getElementById('js-plist').querySelectorAll('.pro_box');
			for(var ci = data.length-1;ci>=0;ci--){
				_tagName[ci].className = (ci==index) ? "pro_box current" : "pro_box";
			}
			//if(data[index]['content']['ajaxcontent']['ajaxFlag']){
				that.createLoading();
				Ajax.doAjax("GET",_url,true,function(txt){
					//_html += '<div class="ar_content">';
					//_html += txt;
					//_html +='</div>';
					//document.getElementById('js-dialog').innerHTML = 
					document.getElementById('js-content').removeChild(document.getElementById('js-loading'));
					document.getElementById('js-content').innerHTML = txt;
				});
			//}else{
				//window.open("/article/page/"+idPro+".html");
				//window.location.href = "/article/page/"+idPro+".html";
			//}
			window.location.href="#"+idPro;
		}
	},
	init : function(articleData){
		this.sideRender(articleData);
		this.clickAjax(articleData);
	}
};





