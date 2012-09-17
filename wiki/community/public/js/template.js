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
		},
        sidebar : function(id){
            var that = this,_html = "";
            if( id !="js-sidebar"){
                return;
            }
            _html = '<ul class="mod_pcenter"> ';
            _html += '   <li><a href="javascript:void(0);"  name="1_2" title="个人中心" id="sp_pc"><span class="sp_ico sp_pc"></span>个人中心</a><a href="http://pay.my.4399.com/" name="1_1" title="充值" class="a_cz">充值</a>      ';
            _html += '        <ul class="mod_pclist" id="mod_pclist" style="display:none;">              ';
            _html += '            <li><a href="/space-doing.html" name="1_3" title="记录" class="sp_xt sp_jl">记录</a></li>           ';
            _html += '           <li><a href="/album/square" name="1_5" title="相册" class="sp_xt sp_xc">相册</a><a href="/album/upload" name="1_4" title="上传" class="mod_prt">上传</a></li>   ';
            _html += '            <li><a href="/space-blog.html" name="1_7" title="日志" class="sp_xt sp_rz">日志</a><a href="/cp.php?ac=blog" name="1_6" title="发表" class="mod_prt">发表</a></li>    ';
            _html += '            <li><a href="/space-share.html" name="1_8" title="分享" class="sp_xt sp_fx">分享</a></li>       ';
            _html += '            <li><a href="http://pay.my.4399.com/" name="1_9" title="充值中心" class="sp_xt sp_cz">充值中心</a></li>   ';
            _html += '            <li><a href="/space-poll.html" name="1_10" class="sp_xt sp_tp">投票</a><a href="/cp.php?ac=poll" name="1_11" title="发起" class="mod_prt">发起</a></li>  ';
            _html += '           <li><a href="/cp.php?ac=task2" name="1_12" title="任务" class="sp_xt sp_rw">任务</a></li>      ';
            _html += '            <li><a href="/cp.php?ac=medal" name="1_13" title="勋章" class="sp_xt sp_xz">勋章</a></li>     ';
            _html += '            <li><a href="/apps.php?do=gift" name="1_14" title="礼物" class="sp_xt sp_lw">礼物</a></li>      ';
            _html += '           <li><a href="/plugins/favorite/" name="1_16" title="4399收藏盒" class="sp_xt sp_sc">4399收藏盒</a></li>       ';
            _html += '        </ul>      ';
            _html += '    </li>     ';
            _html += '    <li><a href="/forums.php" name="1_13" title="群组"><span class="sp_ico sp_group"></span>群组</a><a href="/space-thread-view-me.html" name="1_12" title="话题" class="a_ht">话题</a></li>   ';
            _html += '    <li><a href="/album/square?_F_=LFT_SQ" name="1_14" title="相册"><span class="sp_ico sp_album"></span>相册</a><a href="/album/upload?_F_=LFT_UP" name="1_14" title="上传图片到相册" class="a_ht">上传</a></li>   ';
            _html += '<li class="mod_game"><a href="http://www.4399.com/" name="1_24" title="4399小游戏" target="_blank"><span class="sp_ico sp_xyx"></span><span class="sp_dir">4399小游戏</span></a></li>      ';
            _html += '</ul>      ';
            _html += '    <div class="mod_sgame">      ';
            _html += '       <div class="hd">         ';
            _html += '            <span class="close" id="mod_web">网页游戏</span>   ';
            _html += '            <a href="/myapp_web.html?t=add" name="1_17" title="添加" class="a_add">添加</a>  ';
            _html += '       </div>                                                   ';
            _html += '       <div class="mid" id="mod_sweb" style="display:none"> ';
            _html += '           <div class="bd">        ';
            _html += '                <ul class="mod_glist">     ';
            _html += '                    <li><span sname="热血海贼王" sid="800114"></span><a href="/userapp.php?id=800114" title="热血海贼王"><img src="http://s4.img4399.com/1/apps/800114" /><i>热血海贼王</i></a></li>    ';
            _html += '                    <li><span sname="画皮2网页版" sid="800113"></span><a href="/userapp.php?id=800113" title="画皮2网页版"><img src="http://s4.img4399.com/1/apps/800113" /><i>画皮2网页版</i></a></li>    ';
            _html += '                    <li><span sname="疯狂宠物" sid="800111"></span><a href="/userapp.php?id=800111" title="疯狂宠物"><img src="http://s4.img4399.com/1/apps/800111" /><i>疯狂宠物</i></a></li>       ';
            _html += '                   <li><span sname="4399神仙道" sid="800110"></span><a href="/userapp.php?id=800110" title="4399神仙道"><img src="http://s4.img4399.com/1/apps/800110" /><i>4399神仙道</i></a></li>   ';
            _html += '                   <li><span sname="百炼成仙" sid="800108"></span><a href="/userapp.php?id=800108" title="百炼成仙"><img src="http://s4.img4399.com/1/apps/800108" /><i>百炼成仙</i></a></li>    ';
            _html += '                   <li><span sname="神魔斗" sid="800105"></span><a href="/userapp.php?id=800105" title="神魔斗"><img src="http://s4.img4399.com/1/apps/800105" /><i>神魔斗</i></a></li>   ';
            _html += '                   <li><span sname="梦幻飞仙" sid="174"></span><a href="/userapp.php?id=174" title="梦幻飞仙"><img src="http://s4.img4399.com/1/apps/174" /><i>梦幻飞仙</i></a></li>      ';
            _html += '                    <li><span sname="傲视遮天" sid="155"></span><a href="/userapp.php?id=155" title="傲视遮天"><img src="http://s4.img4399.com/1/apps/155" /><i>傲视遮天</i></a></li> ';
            _html += '                   <li><span sname="4399火影世界" sid="800103"></span><a href="/userapp.php?id=800103" title="4399火影世界"><img src="http://s4.img4399.com/1/apps/800103" /><i>4399火影世界</i></a></li>    ';
            _html += '                   <li><span sname="4399冒险王" sid="800106"></span><a href="/userapp.php?id=800106" title="4399冒险王"><img src="http://s4.img4399.com/1/apps/800106" /><i>4399冒险王</i></a></li> ';
            _html += '                   <li><span sname="凡人修真2" sid="151"></span><a href="/userapp.php?id=151" title="凡人修真2"><img src="http://s4.img4399.com/1/apps/151" /><i>凡人修真2</i></a></li>     ';
            _html += '                   <li><span sname="神魔遮天" sid="800100"></span><a href="/userapp.php?id=800100" title="神魔遮天"><img src="http://s4.img4399.com/1/apps/800100" /><i>神魔遮天</i></a></li>    ';
            _html += '                   <li><span sname="三国杀" sid="100181"></span><a href="/userapp.php?id=100181" title="三国杀"><img src="http://s4.img4399.com/1/apps/100181" /><i>三国杀</i></a></li>   ';
            _html += '                   <li><span sname="英雄远征" sid="137"></span><a href="/userapp.php?id=137" title="英雄远征"><img src="http://s4.img4399.com/1/apps/137" /><i>英雄远征</i></a></li>    ';
            _html += '               </ul>                ';
            _html += '                <a href="/myapp_web.html" title="更多网页游戏" class="mod_more">更多网页游戏</a> </div>   ';
            _html += '            <div class="fd"></div>   ';
            _html += '        </div>       ';
            _html += '    </div>           ';
            _html += '    <div class="mod_sgame">         ';
            _html += '        <div class="hd">             ';
            _html += '            <span class="close" id="mod_medal">勋章游戏</span>        ';
            _html += '            <a href="/myapp_medal.html?t=add" name="1_17" title="添加" class="a_add">添加</a>    ';
            _html += '        </div>                  ';
            _html += '       <div class="mid" id="mod_smedal" style="display:none">      ';
            _html += '            <div class="bd">               ';
            _html += '                <ul class="mod_glist">     ';
            _html += '                    <li><span sname="僵尸危机3" sid="3005931"></span><a href="/userapp.php?id=3005931" title="僵尸危机3"><img src="http://s4.img4399.com/1/apps/3005931" /><i>僵尸危机3</i></a></li>      ';
            _html += '                    <li><span sname="超级马里奥水上摩托" sid="3056259"></span><a href="/userapp.php?id=3056259" title="超级马里奥水上摩托"><img src="http://s4.img4399.com/1/apps/3056259" /><i>超级马里奥水上摩托</i></a></li>  ';
            _html += '                   <li><span sname="宠物连连看2.5版" sid="3001382"></span><a href="/userapp.php?id=3001382" title="宠物连连看2.5版"><img src="http://s4.img4399.com/1/apps/3001382" /><i>宠物连连看2.5版</i></a></li>    ';
            _html += '                   <li><span sname="爆发的小火山" sid="3054185"></span><a href="/userapp.php?id=3054185" title="爆发的小火山"><img src="http://s4.img4399.com/1/apps/3054185" /><i>爆发的小火山</i></a></li>          ';
            _html += '                   <li><span sname="Q版泡泡堂" sid="3003881"></span><a href="/userapp.php?id=3003881" title="Q版泡泡堂"><img src="http://s4.img4399.com/1/apps/3003881" /><i>Q版泡泡堂</i></a></li>                  ';
            _html += '                    <li><span sname="梦幻超人精装版" sid="3026184"></span><a href="/userapp.php?id=3026184" title="梦幻超人精装版"><img src="http://s4.img4399.com/1/apps/3026184" /><i>梦幻超人精装版</i></a></li>   ';
            _html += '                </ul>               ';
            _html += '                <a href="/myapp_medal.html" title="更多勋章游戏" class="mod_more">更多勋章游戏</a> </div>  ';

            _html += '            <div class="fd"></div>        ';
            _html += '       </div>                           ';
            _html += '    </div>                            ';
            _html += '    <div class="mod_sgame">             ';
            _html += '        <div class="hd ">              ';
            _html += '           <span class="close open" id="mod_xx">休闲游戏</span>   ';
            _html += '           <a href="/myapp_social.html?t=add" name="1_17" title="添加" class="a_add">添加</a>   ';
            _html += '       </div>                             ';
            _html += '        <div class="mid" id="mod_sxx">    ';
            _html += '            <div class="bd">            ';
            _html += '               <ul class="mod_glist">    ';
            _html += '                   <li><span sname="4399神仙道" sid="800110"></span><a href="/userapp.php?id=800110" title="4399神仙道"><img src="http://s4.img4399.com/1/apps/800110" /><i>4399神仙道</i></a></li>              ';
            _html += '                    <li><span sname="疯狂邻居" sid="800115"></span><a href="/userapp.php?id=800115" title="疯狂邻居"><img src="http://s4.img4399.com/1/apps/800115" /><i>疯狂邻居</i></a></li>                   ';
            _html += '                   <li><span sname="热血海贼王" sid="800114"></span><a href="/userapp.php?id=800114" title="热血海贼王"><img src="http://s4.img4399.com/1/apps/800114" /><i>热血海贼王</i></a></li>             ';
            _html += '                   <li><span sname="神魔斗" sid="800105"></span><a href="/userapp.php?id=800105" title="神魔斗"><img src="http://s4.img4399.com/1/apps/800105" /><i>神魔斗</i></a></li>                         ';
            _html += '                   <li><span sname="4399火影世界" sid="800103"></span><a href="/userapp.php?id=800103" title="4399火影世界"><img src="http://s4.img4399.com/1/apps/800103" /><i>4399火影世界</i></a></li>        ';
            _html += '                   <li><span sname="4399冒险王" sid="800106"></span><a href="/userapp.php?id=800106" title="4399冒险王"><img src="http://s4.img4399.com/1/apps/800106" /><i>4399冒险王</i></a></li>              ';
            _html += '                   <li><span sname="美食大战老鼠" sid="100192"></span><a href="/userapp.php?id=100192" title="美食大战老鼠"><img src="http://s4.img4399.com/1/apps/100192" /><i>美食大战老鼠</i></a></li>        ';
            _html += '                   <li><span sname="飘渺西游" sid="100204"></span><a href="/userapp.php?id=100204" title="飘渺西游"><img src="http://s4.img4399.com/1/apps/100204" /><i>飘渺西游</i></a></li>                    ';
            _html += '                   <li><span sname="帝国风云" sid="100222"></span><a href="/userapp.php?id=100222" title="帝国风云"><img src="http://s4.img4399.com/1/apps/100222" /><i>帝国风云</i></a></li>                   ';
            _html += '                    <li><span sname="皮卡堂过家家" sid="100212"></span><a href="/userapp.php?id=100212" title="皮卡堂过家家"><img src="http://s4.img4399.com/1/apps/100212" /><i>皮卡堂过家家</i></a></li>      ';
            _html += '                   <li><span sname="开心宝贝" sid="1029889"></span><a href="/userapp.php?id=1029889" title="开心宝贝"><img src="http://s4.img4399.com/1/apps/1029889" /><i>开心宝贝</i></a></li>               ';
            _html += '                   <li><span sname="4399开心农场" sid="1021978"></span><a href="/userapp.php?id=1021978" title="4399开心农场"><img src="http://s4.img4399.com/1/apps/1021978" /><i>4399开心农场</i></a></li>   ';
            _html += '                   <li><span sname="小小忍者" sid="100196"></span><a href="/userapp.php?id=100196" title="小小忍者"><img src="http://s4.img4399.com/1/apps/100196" /><i>小小忍者</i></a></li>                 ';
            _html += '                   <li><span sname="4399弹弹堂" sid="101"></span><a href="/userapp.php?id=101" title="4399弹弹堂"><img src="http://s4.img4399.com/1/apps/101" /><i>4399弹弹堂</i></a></li>                   ';
            _html += '                   <li><span sname="三国Q战" sid="100199"></span><a href="/userapp.php?id=100199" title="三国Q战"><img src="http://s4.img4399.com/1/apps/100199" /><i>三国Q战</i></a></li>                   ';
            _html += '                   <li><span sname="德克萨斯扑克" sid="1005122"></span><a href="/userapp.php?id=1005122" title="德克萨斯扑克"><img src="http://s4.img4399.com/1/apps/1005122" /><i>德克萨斯扑克</i></a></li>  ';
            _html += '               </ul>                                                                                  ';
            _html += '               <a href="/myapp_social.html" title="更多休闲游戏" class="mod_more">更多休闲游戏</a> </div>   ';
            _html += '           <div class="fd"></div>     ';
            _html += '        </div>                   ';
            _html += '    </div>                       ';
            _html += '    <div class="mod_link mt10">     ';
            _html += '        <div class="hd"></div>   ';
            _html += '        <div class="bd">  ';
            _html += '           <ul>      ';
            _html += '               <li><a href="http://www.4399.com/special/214.htm" target="_blank" name="1_15" title="积分小游戏"><span class="sp_ico sp_jf"></span>积分小游戏</a></li> ';
            _html += '               <li><a href="http://box.4399.com/" name="1_24" title="4399游戏盒" target="_blank"><span class="sp_ico sp_hz"></span>4399游戏盒</a></li>       ';
            _html += '               <li><a href="/space-mtag-view-list-tagid-81116-kind-20.html" name="1_25" title="意见反馈"><span class="sp_ico sp_fk"></span>意见反馈</a></li> ';
            _html += '               <li><a href="/help1.php" title="帮助中心"><span class="sp_ico sp_fk"></span>帮助中心</a></li> ';
            _html += '           </ul>   ';
            _html += '        </div> ';
            _html += '   </div>';
            that.$(id).innerHTML = _html;
            return that;
        }
	}
	win.f2er = f2er;
})(window);
