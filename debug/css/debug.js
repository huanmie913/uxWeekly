javascript:(function(){
	var _link = document.createElement('link');
	_link.setAttribute('href','debug.css');
	_link.setAttribute('rel','stylesheet');
	_link.setAttribute('type','text/css');
	if( typeof (_link) != undefined ){
		document.getElementsByTagName('head')[0].appendChild(_link);
	}
})();