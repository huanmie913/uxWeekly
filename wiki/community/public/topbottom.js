/*
 * 公共头底部
 * depend: javascript
 * author: f2er
 * time  : 2012-07-23
*/

~(function(win,undefined){
	var f2er = f2er || {};
	f2er = {
		$ : function(id){
			return (typeof id == "string") ? document.getElementById(id):id;
		},
		top : function(id){
			var that = this,_html = "";
			if( id != "js_top" ){
				return;
			}
			_html += '<div class="mod_topbar">';
			_html += '<div class="mod_topbox clearfix">';
			_html += '<a href="/" title="4399游戏吧" class="mod_logo left"><img src="http://s4.img4399.com/1/logo.gif" alt="4399游戏吧" /></a>';
			_html += '<ul class="mod_nav left"><li class="current"><a name="17_2" href="/index.php?ct=space&ac=home"><span>首页</span></a></li> <li><a name="17_3" href="/home.php"><span>个人主页</span></a></li> <li><a name="17_4" href="/space-friend.html"><span>好友</span></a></li> <li><a name="17_6" href="/index.php?ct=myapp"><span>游戏中心</span></a></li> <li><a name="17_7" href="/network.html"><span>随便看看</span></a></li> <li><a name="17_8" href="http://pay.my.4399.com/"><span>充值中心</span></a></li> </ul>';
			_html += '<div class="mod_uinfo"> <a title="头像" name="18_1" href="/121465122" class="mod_avatar"><img src="http://a.img4399.com/121465122/small" width="24" height="24" alt="" /></a> <a name="18_2" href="/121465122" class="mod_name">情封 (uepanda)</a> <div class="mod_ulinks" id="mod_ulinks"> <a name="18_3" href="/cp.php?ac=invite">邀请</a> <a name="18_5" href="/cp.php">设置</a> <a name="18_6" href="/help1.php">帮助</a> <a name="17_8" href="/space-pm.html">消息</a> <a name="18_7" href="#" onclick="UniLogin.logout();return false;">退出</a> <span class="mod_mnew" id="mod_mnew" style="display:none"></span> </div> </div> </div></div>';
			that.$(id).innerHTML = _html;
			return that;
		},
		bottom : function(id){
			var that = this,_html = "";
			if( id != "js_bottom" ){
				return;
			}
			_html +='<div class="footer clearfix">';
			_html +='	<div class="page_wrapper">';
			_html +='		<div class="left mod_server"><p>4399游戏吧&nbsp;&nbsp;最大的中文休闲游戏社区</p> <p class="mod_phone"><span>服务热线：400-633-4399</span></p> </div>';
			_html +='		<div class="right mod_desc"> <p><a href="http://t.sina.com.cn/my4399" target="_blank" rel="nofollow" name="13_6" >4399官方微博</a>|<a href="http://t.sina.com.cn/caiwensheng" target="_blank" rel="nofollow" name="13_7">蔡文胜微博</a>|<a href="/sitemap/" target="_blank">网站地图</a>|<a href="/help1.php" target="_blank">客服中心</a>|<a href="/joinus/zhaopin.html" target="_blank" name="13_3" class="a_zp">诚聘英才</a>|<a href="/joinus/" target="_blank" name="13_4">关于我们</a></p> <p><span><a rel="nofollow" href="http://imga.4399.com/upload_pic/2011/icp.jpg" target="_blank" name="13_2">ICP证：闽B2-20040099</a></span><span><a rel="nofollow" href="http://net.china.cn/chinese/index.htm" target="_blank" name="13_4" title="不良信息举报中心">不良信息举报中心</a></span><span><a href="http://imga.4399.com/upload_pic/2011/wenwangwen.jpg" target="_blank" name="13_5" title="文网文[2009]245号">文网文[2009]245号</a></span><span><a href="http://imga.4399.com/upload_pic/2011/chuban.jpg" target="_blank" rel="nofollow" name="13_8">新出网证（闽）字06号</a></span></p> <p>Copyright&copy;2004 - 2012 4399.com All Rights Reserved. 四三九九网络股份有限公司 版权所有</p> </div>';
			_html +='</div></div>';
			that.$(id).innerHTML = _html;
			return that;
		}
	}
	return win.f2er = f2er;
})(window);
