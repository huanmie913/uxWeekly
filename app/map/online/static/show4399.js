var Ajax = function(recv){
	var aj = new Object;
	aj.recv = recv || 'HTML';
	
	aj.load = function(){
		var request = false;
		if(window.XMLHttpRequest) {
			request = new XMLHttpRequest();
			if(request.overrideMimeType) {
				request.overrideMimeType('text/xml');
			}
		}
		else if(window.ActiveXObject) {
			var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
			for(var i=0; i< versions.length; i++) {
				try {
					request = new ActiveXObject(versions[i]);
					if(request) {
						return request;
					}
				} catch(e) {}
			}
		}
		return request;
	};
	
	aj.xhr = aj.load();
	
	aj.process = function(){
		if(aj.xhr.readyState == 4 && aj.xhr.status == 200) {
			if(aj.recv == 'HTML') {
				aj.func(aj.xhr.responseText);
			} else if(aj.recv == 'XML') {
				try {
					aj.func(aj.xhr.responseXML.lastChild.firstChild.nodeValue);
				} catch(e) {
					aj.func('');
				}
			}
		}
	};
	
	aj.get = function(url, func){
		aj.func = func;
		aj.xhr.onreadystatechange = aj.process;
		var delay = 100;
		if(window.XMLHttpRequest) {
			setTimeout(function(){
			aj.xhr.open('GET', url);
			aj.xhr.send(null);}, delay);
		} else {
			setTimeout(function(){
			aj.xhr.open("GET", url, true);
			aj.xhr.send();}, delay);
		}
	}
	
	aj.post = function(url, data, func){
		aj.func = func;
		aj.xhr.onreadystatechange = aj.process;
		aj.xhr.open('POST', url);
		aj.xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		aj.xhr.send(data);
	};
	
	return aj;
}