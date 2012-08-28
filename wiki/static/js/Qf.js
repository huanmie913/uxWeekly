/*
 * to:www.4399.com
 * depend: javascript
 * author: f2er(Qf)
 * time :  2012-04-17
*/

(function(win,doc){
    var Qf = win.Qf || {};

    /*dom*/
    Qf.dom = Qf.dom || {};
    Qf.dom = {
        _$ : function(id){
            return typeof id == "id" ? document.getElementById(id) : id;
        },
        getCssProperty : function(){}
    }

    /*EventUtil*/
    Qf.EventUtil = Qf.EventUtil || {};

    Qf.EventUtil = {
        _on : function(o,type,fn){

        },
        _off : function(){

        }
    }

    /*fn*/
    Qf.fn = Qf.fn || {};
    Qf.fn = {
       clearBlank : function(){

       } 
    }
})(window,document);

