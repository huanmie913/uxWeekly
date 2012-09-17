/**
  * to:ellipsis
  * author:f2er
  * time:12-08-13
**/

(function(win,undefined){
            var browser = ({
               init : function(){
                   var s, ua = navigator.userAgent.toLowerCase();
                   ( s = ua.match(/msie([\d.]+)/))? this.set('ie',(s[1])):
                   ( s = ua.match(/firefox\/([\d.]+)/)) ? this.set('firefox',(s[1])):
                   ( s = ua.match(/chrome\/([\d.]+)/)) ? this.set('chrome',(s[1])) :
                   ( s = ua.match(/opera.([\d.]+)/)) ? this.set("opera",(s[1])) :
                   ( s = ua.match(/version\/([\d.]+).*safari/)) ? this.set("safari",(s[1])) : 0;
                   return this;
               },
               set : function(name,version){
                   this.name = name;
                   this.version = version;
                   this[name] = version;
               }
            }).init();
            var isSupportCss = {
                privatePrefixs : {
                    "ie" : "Ms",
                    "firefox" : "Moz",
                    "opera" : "O",
                    "chrome" : "Webkit",
                    "safari" : "Webkit"
                },
                getPrivatePrefix : function(){
                   return this.privatePrefixs[browser.name];
                },
                isSupport : function(property, checkPrivate, value){
                    var element = document.createElement('div');
                    if(property in element.style){
                        element.style[property] = value;
                        return element.style[property] === value;
                    }else if(checkPrivate){
                        var firstChar = property.charAt(0).toUpperCase();
                        property = this.getPrivatePrefix() + firstChar + property.substr(1);
                        return  this.isSupport(property,false,value);
                    }else{
                        return false;
                    }
                }
            };
            var ellipsis = function(element){
                var limitWidth = element.clientWidth;
                var ellipsisText = "...";
                var temp = element.cloneNode(true);
                temp.id = "checkTextLengthNode";
                temp.className+=" check-text-length-node";
                element.parentNode.appendChild(temp);
                var realWidth = temp.clientWidth;
                if(realWidth <= limitWidth){
                    return;
                }
                temp.innerHTML = ellipsisText;
                var elliWidth = temp.clientWidth;

                var str = element.innerHTML;
                str = str.replace(/\s+/g,' ');
                var s,totalWidth =0;
                for(var i= 0,len = str.length;i<len;i++){
                    s = str.charAt(i);
                    temp.innerHTML = ( s === ' ' ? ' ' : s );
                    totalWidth += temp.clientWidth;
                    if( totalWidth+elliWidth > limitWidth ){
                        str = str.substr(0,i);
                        break;
                    }
                }
                element.innerHTML = str + ellipsisText;
                temp.parentNode.removeChild(temp);
            }
            win.isSupportCss = isSupportCss;
            win.ellipsis = ellipsis;
        })(window);