/*
 * gameAD
 * Tab: µÇÂ¼×¢²á¿òÇÐ»»
 * switchTitle £º±êÌâÀ¸ÇÐ»»
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
				/*var _isShow = false,_space = "";
				var TitleObj = {};
				TitleObj.tip = tip;
				TitleObj.title = title;
				TitleObj.change = function(){
					//var _fun = arguments.callee;
					if(_isShow){
						_doc.title = TitleObj.title;
						_isShow = false;
					}else{
						_doc.title = _space;
						_isShow = true;
					}
					setTimeout(TitleObj.change,1000);
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
				return TitleObj;*/
				var data = [title,tip];
				var len = data.length,seed = 0, _show = true;
				var _change = function(){
					_doc.title = data[seed++ % len];
					setTimeout(_change,1000);
				};
				_change();

			}
		}
		win.gameAD = gameAD;
	})(window);