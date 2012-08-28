/*
* 开服提示
* author :QF
* time: 12-03-10
* TipBox.init();
*/
var TipBox = (function(){

	var _option= {
		_gid : null,
		_gdata : "",
		_flag : 0,
		_t : null,
		_offset : {
			x : 0,
			y : 0
		}
	}

	function getPos(o,target){
		var _x = o.offset().left + _option._offset.x,
			_y = o.offset().top + _option._offset.y;
		target.css({"left":_x,"top":_y});
	}
	function tpl(data){
		var _html = '<div class="sns_tip" id="sns_tip"><div class="m_arrow"><em>◆</em><span>◆</span></div><div id="J_time"></div></div>';
		if( $("#sns_tip").size() == 0){
			$("body").append( _html);
		}
		if( $("#J_time").size() > 0){
			$("#sns_tip").show();
			$("#J_time").html( data );
		}
		
		$("#sns_tip").hover(function(e){
			clearTime();
			_option._flag = 1;
		},function(e){
			clearTime();
			var _target = e.relatedTarget;
			while( _target != null && (_target.className !="sns_tip")){
				_target=_target.parentNode;
			}
			if( _target == null ){
				_option._flag = 0;
				_option._t = setTimeout(function(){
					hideObj();
				},50)
			}
		})
	}
	function clearTime(){
		clearTimeout( _option._t );
	}
	function hideObj(){
		if( !_option._flag ){
			$("#sns_tip").hide();
		}
	}
	function doEvent(){
		_option._gid.find('li').each(function(i){
			$(this).hover(function(){
				var _data = $(this).attr( _option._gdata );
				_option._flag = 1;
				if( _data != undefined){
					tpl( _data )
					getPos($(this),$("#sns_tip") );
				}
			},function(e){
				_option._flag = 0;
				_option._t = setTimeout(function(){
					hideObj();	
				},50)
			})
		})
	}
	function init(ctg){
			_option = {
				_gid : $("#"+ctg.id),
				_gdata : ctg.data,
				_offset : {
					x : ctg.offset.x,
					y : ctg.offset.y
				}
			}
			
		clearTime();
		doEvent();
	}
	return { init:init}
})();


