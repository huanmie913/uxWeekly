/*
 * To: wiki/dm/
 * Time:2012-04-10
 * authro :f2er 
* */


var dm_f2er = dm_f2er || {};

dm_f2er = {
    triggerResource : function(){
       var _dm = document.getElementById("dm"),
           _btnLookResource = _dm.querySelectorAll("span.look_reource"),
           _resourceBox = _dm.querySelectorAll("div.demo_resource");
        for( var i = 0,len= _btnLookResource.length;i<len;i++){
            _btnLookResource[i].onclick = (function(n){
                var flag = 0;
                return function(){
                    if( flag == 0 ){
                        _resourceBox[n].style.display = "block";
                        flag = 1;
                    }else{
                        _resourceBox[n].style.display = "none";
                        flag = 0;
                    }
                }
            })(i);
        }
    }
};
