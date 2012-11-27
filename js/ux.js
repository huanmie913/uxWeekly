/**
 * Created with JetBrains PhpStorm.
 * User: f2er
 * Date: 12-11-20
 * Time: 下午1:30
 * To change this template use File | Settings | File Templates.
 */

!(function(win){
    var _doc = win.document;
    var KS = KS || {};

    function $(id){
        return typeof id == "string" ? _doc.getElementById(id) : id;
    }
    function isObject(obj){
        return !!obj;
    }
    function uxHead(id){
        if( !isObject($(id)) ){
            return;
        }
        var _html = '<a href="http://uxweekly.f2er.net/" title="返回首页">返回首页</a>';
        $(id).innerHTML = _html;
    }

    function uxFooter(id){
        if( !isObject($(id)) ){
            return;
        }
        var _html = '<div class="ux_footer">'+
           
                    //'<div><a  href="http://demo.4399ued.com/ued/ux/index.html"   class="ued"></a></div>'+
                    '<dl class="ux_about">'+
                        '<dt>关于前端周刊</dt>'+
                        '<dd>前端周刊，是一份用以收集和分享UX资源、业界观点、创新与前瞻的小站，竭诚欢迎有兴趣的同学共同参与组织与供稿。</dd>'+
                        '<dd class="member">前端周刊小组成员:<a href="http://uxweekly.f2er.net/about.html" class="about">快～快点我</a></dd>'+
                    '</dl>'+

                    '</div>'+
                    '<div class="ux_site">本站链接均来自于互联网，有兴趣参与的童鞋请联系 <a target="_self" href="http://weibo.com/f2er/profile?rightmod=1&wvr=5&mod=personinfo">@情封</a><a target="_self" href="http://weibo.com/u/1853686853">@鬼懿</a>'+
                    '<scri'+'pt type="text/javascript">var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cscript src=\'" + _bdhmProtocol + \"hm.baidu.com/h.js%3Fd19e0ade259c89f350a75fb8e02cf042' type="text/javascript"%3E%3C/script%3E"));</script>'+
					'</div>';
        $(id).innerHTML = _html;
    }

    KS.Head = uxHead;
    KS.Foot = uxFooter;
    win.KS = KS;
})(window);
