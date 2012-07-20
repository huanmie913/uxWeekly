/*
 * gameAD
 * Tab: 登录注册框切换
 * switchTitle ：标题栏切换
 * 2012-07-21
*/
~(function(win){
		var _doc = win.document;
		var gameAD = {
			$ : function(id){
				return typeof id == "string" ? _doc.getElementById(id) : id;
			},
			on : function(otarget,otype,ofn){
				if(otarget.addEventListener){
					return otarget.addEventListener(otype,ofn,false);
				}else if(otarget.attachEvent){
					return otarget.attachEvent("on"+otype,ofn);
				}else{
					return otarget["on"+otype] = ofn;
				}
			},
			Tab : function(tid,callback){
				var tab = {};
				tab.tid = tid || document;
				tab.create = function(){
					gameAD.on( gameAD.$(tab.tid),'click',function(e){
						var _e = e || win.event,
							_target = _e.srcElement || _e.target,
							_element = null;
						if(_target.nodeName.toLowerCase()!="li"){
							_element = _target.parentNode;
						}else{
							_element = _target;
						}
						var _id = _element.id;
						switch(_id){
							case "Reg" : 
								tab.doTab(_id,'Login',callback);
								break;
							case "Login" :
								tab.doTab(_id,'Reg');
								break;
						}
					});
				};
				tab.doTab = function(id,cid,callback){
					gameAD.$('popup_auto'+cid+'_frame').style.display="none";
					gameAD.$('popup_auto'+id+'_frame').style.display="block";
					gameAD.$(cid).className="";
					gameAD.$(id).className="cur";
					if(id == "Reg"){
						callback && callback();
					}
				};
				tab.create();				
				return tab;
			},
			switchTitle : function(title,tip){
				var _isShow = false,_space = "";
				var TitleObj = {};
				TitleObj.tip = tip;
				TitleObj.title = title;
				TitleObj.change = function(){
					var _fun = arguments.callee;
					if(_isShow){
						_doc.title = TitleObj.title;
						_isShow = false;
					}else{
						_doc.title = _space;
						_isShow = true;
					}
					setTimeout(function(){_fun();},1000);
				};
				TitleObj.create = function(){
					if( TitleObj.tip ){
						_space = TitleObj.tip;
					}else{
						for(var j = TitleObj.title.length-1;j>=0;j--){
							_space +=" ";
						}
					}
					TitleObj.change();
				};
				TitleObj.create();
				return TitleObj;
			}
		}
		win.gameAD = gameAD;
	})(window);
	
	
	// 通用显示flash函数 主要用于flash在sp2上需要点击一下的框架
	function showFlash(iUrl,iWidth,iHeight,iWmode){
		var flash = "";
			flash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="'+ iWidth +'" height="' + iHeight +'" />';
			flash = flash + '<param name="movie" value="'+ iUrl +'" />';
			flash = flash + '<param name="quality" value="high" />';
			flash = flash + '<param name="menu" value="false" />';
			flash=flash+'<param name="allowScriptAccess" value="always" />';
			if (iWmode == 1) {
				flash = flash + '<param name="wmode" value="transparent" />';		
			}
			flash = flash + '<embed src="' + iUrl + '" width="'+ iWidth +'" height="'+ iHeight +'" menu="false" quality="high" ';
			if (iWmode == 1) {
				flash = flash + 'wmode="transparent" ';		
			}
			flash = flash + ' pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" mwode="transparent" allowScriptAccess="always"></embed>';
			flash = flash + '</object>';
		document.writeln(flash); 
	}