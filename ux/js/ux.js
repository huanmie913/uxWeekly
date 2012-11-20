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
        var _html = '我来自头部';
        $(id).innerHTML = _html;
    }

    function uxFooter(id){
        if( !isObject($(id)) ){
            return;
        }
        var _html = '<div class="ux_footer">'+
                    '<div class="xm_fe">'+
                    '<img src="http://tp1.sinaimg.cn/2771882100/180/5631942496/0" width="71" height="71" alt="厦门前端联盟"/>厦门前端联盟</div>'+
                    '<div class="ued">4399用户体验部门</div>'+
                    '<dl class="ux_about">'+
                        '<dt>关于UX火花集</dt>'+
                        '<dd>UX火花，是一份用以收集和分享UX资源、业界观点、创新与前瞻的邮件列表，欢迎有兴趣的同学共同参与组织与供稿。</dd>'+
                        '<dd>地址：http://www.4399ued.com/ux/</dd>'+
                    '</dl>'+

                    '</div>'+
                    '<div class="ux_site">本站链接均来自于互联网，有兴趣参与的童鞋请联系 <span>@情封</span><span>@鬼懿</span>'+
                    '</div>';
        $(id).innerHTML = _html;
    }

    KS.Head = uxHead;
    KS.Foot = uxFooter;
    win.KS = KS;
})(window);
