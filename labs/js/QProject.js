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
		var _html = ' <div class="img_cover"><img src="'+_ocontent.imgCover+'"/></div> ';
			_html += '<h2>'+_ocontent.title+'</h2>';
			_html += ' <ul class="desc"> ';
			_html += '	<li>创建时间:'+_ocontent.createTime+'</li> ';
			_html += '	<li>项目状态:'+_ocontent.state+'</li>';
			_html += '</ul>';
			_html += '<a href="'+_ocontent.url+'" class="a_site">立即体验&gt;&gt;</a>';	

		_sideDiv.innerHTML = _html;
		document.getElementById('js-plist').appendChild(_sideDiv);
	},
	sideRender : function(data){
		for(var ai = 0;ai<data.length;ai++){
			this.tpl( data[ai] );
		}
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
	mask : function(){
		var _scrollHeight = document.documentElement.scrollHeight;
		var _mask = document.createElement('div');
		_mask.id = "js-mask";
		_mask.className = 'mask';
		_mask.style.height = _scrollHeight + "px";
		document.body.appendChild(_mask);
	},
	createLoading : function(){
		var loading = document.createElement('div');
		loading.className = "loading";
		loading.id = "js-loading";
		document.getElementById('js-prodialog').appendChild(loading);
	},
	Dialog : function(id){
		var flag = false;
		if( flag == false ){
			document.getElementById(id).style.display  = "block";
			flag = true;
		}
		document.getElementById('js-closed').onclick = function(e){
			e.stopPropagation();
			document.getElementById(id).style.display = "none";
			if(document.getElementById('js-mask')){
				document.getElementById('js-mask').style.display = "none";
			}
			flag = false;
		}
	},
	clickAjax : function(data){
		var that = this;
		document.getElementById('js-plist').onclick = function(e){
			
			//e.stopPropagation();
			var _target = e.target,_element = null;
			if(_target.nodeName.toLowerCase()!='a'){
				
			
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
				
				if(!document.getElementById('js-mask')){
					that.mask();
				}else{
					document.getElementById('js-mask').style.display = "block";
				}
				that.Dialog("js-prodialog");
				var _url = data[index]['content']['ajaxcontent']['ajaxSource'];
				//var _html = that.ajaxRender(data,index);
				/*var _tagName = document.getElementById('js-plist').querySelectorAll('.pro_box');
				for(var ci = data.length-1;ci>=0;ci--){
					_tagName[ci].className = (ci==index) ? "pro_box current" : "pro_box";
				}*/
					that.createLoading();
					Ajax.doAjax("GET",_url,true,function(txt){
						document.getElementById('js-prodialog').removeChild(document.getElementById('js-loading'));
						document.getElementById('js-dialog').innerHTML = txt;
					});
				window.location.href="#"+idPro;
			}
		}
	},
	init : function(articleData){
		this.sideRender(articleData);
		this.clickAjax(articleData);
		window.onresize = function(){
			var _scrollHeight = document.documentElement.scrollHeight;
			if( document.getElementById('js-mask')){
				document.getElementById('js-mask').style.height = _scrollHeight +"px";
			}
		}
	}
};

QProjectList.updateList = {
	bodyEvent : function(){
		document.onclick = function(e){
			e.stopPropagation();
			document.getElementById('js-update').style.right = "0";
			document.getElementById('js-ulist').style.right = "-170px";
		}
	},
	targetEvent : function(){
		document.getElementById('js-update').onclick = function(e){
			document.getElementById('js-update').style.right = "170px";
			document.getElementById('js-ulist').style.right = 0;
			e.stopPropagation();
		}
	},
	init : function(){
		var that = this;
		that.targetEvent();
		that.bodyEvent();
	}
}





