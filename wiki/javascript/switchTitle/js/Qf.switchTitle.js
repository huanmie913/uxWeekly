/*
* 切换标题
* author :QF
* time: 12-07-15
*/
(function(win){
	var _doc = win.document;
	var F2er = {
		$ : function(id){
			return typeof id == "string" ? _doc.getElementById(id) : id;
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
				if( TitleObj.tip == undefined ){
					for(var j = TitleObj.title.length-1;j>=0;j--){
						_space +=" ";
					}
				}else if( TitleObj.tip ){
					_space = TitleObj.tip;
				}
				TitleObj.change();
			};
			TitleObj.create();
			return TitleObj;
		}
	}
	win.F2er = F2er;
})(window);


