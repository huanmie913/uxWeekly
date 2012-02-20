/*
 * to:searchMode
 * depend:javascript
 * author :f2er
*/
/*
 * iptId : 输入框ID
 * btnSearchSubmit ：提交按钮ID
 * formSearchForm ：表单ID
 * num ：字数个数最大值
*/
function searchMode( ctg ){
	this.setting = {
					iptId : ctg.iptId,
					btnSearchSubmit : ctg.btnSearchSubmit,
					formSearchForm : ctg.formSearchForm,
					num : ctg.num
				   }
	if( !(this instanceof searchMode)){
		return new searchMode(ctg);
	}
	this.init();
}
searchMode.prototype = {
	getid : function( id ){
		return typeof id == "string" ? document.getElementById( id ) : id;
	},
	focusBlur : function(){
		var self = this,
			_defaultValue = "";
		self.getid( self.setting.iptId ).onfocus = function(){
			_defaultValue = this.defaultValue;
			if( this.value == _defaultValue ){
				this.value = ""
			}
		}
		self.getid( self.setting.iptId ).onblur = function(){
			if( this.value.length == 0 ){
				this.value = _defaultValue;
			}
		}
	},
	getLen : function (str) {
		str = str.replace(/(^\s*)|(\s*$)/g, "");
		var aMatch=str.match(/[^\x00-\x80]/g);
		return (str.length+(!aMatch?0:aMatch.length));
	},
	submitForm : function(){
		var self = this;
		self.getid( self.setting.btnSearchSubmit ).onclick = function(){
			var key = self.getid( self.setting.iptId ).value;
			if( self.getLen( key )  < self.setting.num  || key == this.defaultValue ){
				this.focus();
				alert('关键字不能少于'+( self.setting.num-1 ));
				return false;
			}
			self.getid( self.setting.formSearchForm ).submit();
		}
	},
	init : function(){
		var self = this;
		self.focusBlur();
		self.submitForm();
	}
}