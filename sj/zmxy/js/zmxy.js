window.addEventListener('load',function(){
     setTimeout(function(){
          window.scrollTo(0,1);
     },0)
},false);
/*
 * TouchSlider v1.0.4
 * By qiqiboy, http://www.qiqiboy.com, http://weibo.com/qiqiboy, 2012/01/11
 */
eval(function(B,D,A,G,E,F){function C(A){return A<62?String.fromCharCode(A+=A<26?65:A<52?71:-4):A<63?'_':A<64?'$':C(A>>6)+C(A&63)}while(A>0)E[C(G--)]=D[--A];return B.replace(/[\w\$]+/g,function(A){return E[A]==F[A]?A:E[A]})}('(x(O,B){T D=("createTouch"R z)||("ontouchstart"R O)||L,E=z.Bi||z.$("html")[L],G=("B1"R E.j)||("MsTransition"R E.j)||("CI"R E.j)||("Bc"R E.j)||("CY"R E.j)||L,C=D?"touchstart":"mousedown",F=D?"touchmove":"mousemove",P=D?"touchend":"mouseup",A=x(O){a.U=a.CG(O);a.5=a.P(a.U.CU);Bn{Q(a.5.nodeName.toLowerCase()=="BT"){a.v=a.5;a.5=a.v.parentNode}b a.v=a.5.$("BT")[L];Q(r a.v==="8")B7 W B_(\'Can\\\'Cc find "BT"\');X(T A=L;A<a.0.p;A++)Q(a.0[A]==a.5)B7 W B_("An 0 is running");a.0.CT(a.5);a.CV()}B6(P){a.u=-M;a.errorInfo=P.message}};A.CA={3:{CU:"slider",Bb:"ease-out",f:L,BX:600,BO:5000,BG:"",7:"e",Bq:W Bt(),Bz:W Bt()},0:[],P:x(P){o z.getElementById(P)},B8:x(O,D,A){T P=[],C=A.$(D);X(T E=L,B=C.p;E<B;E++)Q((W RegExp("(?:^|\\\\Bu+)"+O+"(?:\\\\Bu+|P)")).test(C[E].BG))P.CT(C[E]);o P},isIE:x(){o!-[M,]},V:(x(){T P=x(O){CJ(O){h"Bd":o("CC"R z.BE.j)?"CC":"styleFloat";m;h"w":o("w"R z.BE.j)?"w":{B0:x(O,P){T A=P.CQ;o A&&A.indexOf("w")>=L&&B4(A.match(/w=([^)]*)/Cb)[M])/BK+""||"M"},B5:x(P,O){P.j.CQ="alpha(w="+O*BK+")";P.j.zoom=M}};m;CP:T P=O.split("-");X(T A=M;A<P.p;A++)P[A]=P[A].Bg(L,M).toUpperCase()+P[A].Bg(M);O=P.join("");o O;m}},A=x(A,C){C=P(C);T B=A.j[C];Q(!B){T O=z.CB&&z.CB.B9&&B9(A,BZ)||A.currentStyle||A.j;Q(r C=="BV")B=O[C];b B=C.B0(A,O)}o B=="f"?"":B},O=x(O,C){T A;X(T B R C){A=P(B);Q(r A=="BV")O.j[A]=C[B];b A.B5(O,C[B])}};o x(P,B){o r B=="BV"?A(P,B):O(P,B)}})(),CG:x(P){T O={},A=CK.CA.toString;Q(P&&A.BM(P)=="[CS CK]")X(T B R a.3)O[B]=r P[B]==="8"?a.3[B]:A.BM(a.3[B])=="[CS Number]"?1(B4(P[B])*BK)/BK:P[B];b O=a.3;o O},9:x(O,A,B,P){Q(O.Bo){O.Bo(A,B,P);o g}b Q(O.CE){O.CE("on"+A,B);o g}o k},BW:x(A){T E=K=L,C=z.Bi,P=z.BE;Q(!A)A=O.BP;Q(O.pageYoffset){E=O.pageXOffset;K=O.pageYOffset}b{E=(C&&C.Bx||P&&P.Bx||L)-(C&&C.Bv||P&&P.Bv||L);K=(C&&C.CW||P&&P.CW||L)-(C&&C.Bf||P&&P.Bf||L)}Q(D&&A.BI.p){T B=A.BI[L];E+=B.Bk;K+=B.Bj}b{E+=A.Bk;K+=A.Bj}o{BD:E,K:K}},d:x(O,P){o x(){o O.apply(P,arguments)}},BR:x(){T O=a.v.$("Ca"),P=a;a.4=!a.4;X(T A=L;A<O.p;A++)O[A].onclick=x(){o P.4?k:g}},CV:x(){a.u=L;a.s=a.U.BG?a.B8(a.U.BG,"CO",a.v):a.v.$("CO");a.p=a.s.p;a.U.BO=c.max(a.U.BO,a.U.BX);a.touching=!!D;a.css3transition=!!G;a.i=a.U.f<L||a.U.f>=a.p?L:a.U.f;Q(a.p<N)o;CJ(a.U.7){h"BU":a.7="BU";a.y=g;m;h"By":a.7="By";a.y=g;m;h"Bh":a.7="Bh";a.y=k;m;CP:a.7="e";a.y=k;m}a.BL();a.BN();a.9(a.v,C,a.d(a.B2,a),k);a.9(z,F,a.d(a.CL,a),k);a.9(z,P,a.d(a.Be,a),k);a.9(a.v,"webkitTransitionEnd",a.d(a._,a),k);a.9(a.v,"msTransitionEnd",a.d(a._,a),k);a.9(a.v,"oTransitionEnd",a.d(a._,a),k);a.9(a.v,"transitionend",a.d(a._,a),k);a.9(O,"BL",a.d(a.BL,a),k)},BL:x(){T P;a.V(a.5,{overflow:"CZ",Ba:"CZ",listStyle:"none",CH:"CN"});a.l=1(a.V(a.5,"l"))||a.5.clientWidth||a.5.offsetWidth;a.q=1(a.V(a.5,"q"))||a.5.clientHeight||a.5.offsetHeight;P={CH:"CN",Bm:"Z",Bl:"Z",B3:"Z",CX:"Z",B$:"Z"};Q(a.y){P.q=a.q*a.p+"S";P.BH=-a.q*a.i+"S";a.V(a.5,{q:a.q+"S"})}b{P.l=a.l*a.p+"S";P.e=-a.l*a.i+"S"}a.V(a.v,P);X(T O=L;O<a.p;O++)a.V(a.s[O],{l:a.l+"S",q:a.q+"S",display:a.y?"CF-row":"CF-cell","Bd":"e",verticalAlign:"BH"});a.V(a.5,{Ba:"visible"})},n:x(P,C){T E=a.y?"BH":"e",H=a.y?"q":"l";P=P<L?a.p-M:P>=a.p?L:P;C=r C=="8"?a.U.BX:1(C);T Bs=a.v,Br=BZ,I=Bs.j,J=a,BA=L,B=1(I[E])||L,D=-P*a[H]-B,O=c.Y(D)<a[H]?c.Bp(c.Y(D)/a[H]*C/BC):C/BC,A=x(O,A,B,P){o-B*((O=O/P-M)*O*O*O-M)+A},F=x(){Q(BA<O&&!G){BA++;I[E]=c.Bp(A(BA,B,D,O))+"S";Br=Bw(F,BC)}b{I[E]=-J[H]*P+"S";J.i=P;Q(!G)J._();J.BF();J.BN()}};I.B1=I.CI=I.msTransition=I.Bc=I.CY=E+" "+(O*BC)+"ms "+a.U.Bb;a.U.Bq.BM(a,P,a.s[a.i]);F()},BN:x(){Q(a.BB||a.U.f<L)o g;a.BB=Bw(a.d(x(){a.7=="e"||a.7=="BU"?a.BS():a.BQ()},a),a.U.BO);a.u=M},BF:x(){clearInterval(a.BB);a.BB=BZ;a.u=N},stop:x(){a.BF();a.i=L;a.n(L);a.u=L},BQ:x(O){O=r O=="8"?O=M:O%a.p;T P=O>a.i?a.p+a.i-O:a.i-O;a.n(P)},BS:x(P){Q(r P=="8")P=M;a.n((a.i+P)%a.p)},B2:x(P){Q("MozOpacity"R z.BE.j)P.CM();a.2=a.BW(P);T O=a.v.j;O.Bm=O.Bl=O.B3=O.CX=O.B$="Z";a.6=M;a.BY=W CD()},CL:x(A){Q(!a.6||A.BI&&A.BI.p>M||A.CR&&A.CR!==M)o;T B=a.y?"BH":"e",E=a.y?"q":"l",D=a.y?"K":"BD",P=a.y?"BD":"K";a.t=a.BW(A);T C=a.t[D]-a.2[D];Q(a.6===N||c.Y(C)>=c.Y(a.t[P]-a.2[P])){Q(O.BP)O.BP.returnValue=k;b A.CM();a.BF();C=C/((!a.i&&C>L||a.i==a.p-M&&C<L)?(c.Y(C)/a[E]+M):M);a.v.j[B]=-a.i*a[E]+C+"S";Q(C!=L)a.6=N}b a.6=L},Be:x(P){Q(r a.6!="8"){Bn{T C=a.y?"K":"BD",B=a.y?"q":"l",O=a.t[C]-a.2[C];Q(a.6===N)a.BR()}B6(A){O=L}Q((W CD()-a.BY<250&&c.Y(O)>a[B]*L.M||c.Y(O)>a[B]/N)&&((O<L&&a.i+M<a.p)||(O>L&&a.i>L)))O>L?a.BQ():a.BS();b a.n(a.i);BJ a.6;BJ a.2;BJ a.t;BJ a.BY;Q(a.U.f>=L)a.BN()}},_:x(P){Q(a.4)a.BR();a.U.Bz.BM(a,a.i,a.s[a.i])}};O.TouchSlider=A})(window,8)','K|M|y|0|1|2|_|$|if|in|px|var|opt|css|new|for|abs|0ms|this|else|Math|bind|left|auto|true|case|index|style|false|width|break|slide|return|length|height|typeof|slides|endPos|status|element|opacity|function|vertical|document|instance|parseInt|startPos|_default|stopping|container|scrolling|direction|undefined|addListener|_transitionend|getElementsByTagName|I|timer|10|x|body|pause|className|top|touches|delete|100|resize|call|begin|timeout|event|prev|toggleChildren|next|ul|up|string|getMousePoint|speed|startTime|null|visibility|fx|OTransition|float|_end|clientTop|substring|right|documentElement|clientY|clientX|MozTransitionDuration|webkitTransitionDuration|try|addEventListener|ceil|before|L|J|Function|s|clientLeft|setTimeout|scrollLeft|down|after|get|WebkitTransition|_start|msTransitionDuration|parseFloat|set|catch|throw|$E|getComputedStyle|Error|transitionDuration|prototype|defaultView|cssFloat|Date|attachEvent|table|parse_args|position|MozTransition|switch|Object|_move|preventDefault|relative|li|default|filter|scale|object|push|id|setup|scrollTop|OTransitionDuration|transition|hidden|a|i|t'.split('|'),149,156,{},{}))

~(function(win,undefined){
	var doc = win.document,
		dbe = doc.body || doc.documentElement;

	var QF = QF || {};
	QF ={
		$ : function(id){
			return typeof id == "string" ? doc.getElementById(id) : id;
		},
		getCssProperty : function(element,attr){
			if(element.style[attr]){
				return element.style[attr];
			}else if(element.currentStyle){
				return element.currentStyle[attr];
			}else if(document.defaultView && document.defaultView.getComputedStyle){
				attr=attr.replace(/([A-Z])/g,'-$1').toLowerCase();
				return document.defaultView.getComputedStyle(element,null).getPropertyValue(attr);
			}else{
				return null;
			}
		}
	}

	function ZMXY(){
		this.option = {
			maskID : 'j-mask',
			dataPro : 'data-m',
			popID  : 'j-pop'
		}
		if(!(this instanceof arguments.callee)){
			return new arguments.callee();
		}
	}
	ZMXY.prototype = {
		createMask : function(){
			var that = this,_mkObj = null;
			var _height = dbe.clientHeight > dbe.scrollHeight ? dbe.clientHeight : dbe.scrollHeight + dbe.scrollTop;
			if( !QF.$(that.option.maskID) ){
				var _mkDIV = doc.createElement('div');
				_mkDIV.className = "mask";
				_mkDIV.id = that.option.maskID;
				doc.body.appendChild(_mkDIV);	
			}
			_mkObj = QF.$(that.option.maskID);
			_mkObj.style.display = "block";
			_mkObj.style.height = _height+"px";
		},
		createPop : function(){
			var that = this;
			var _popDiv = doc.createElement('div');
			_popDiv.className = 'sj_pop';
			_popDiv.id = that.option.popID;
			var _html = '<div class="sj_ipop"><div class="hd">';
				_html += '	<h2>造梦西游3宠物快速升级攻略 几级进化</h2>';
				_html += '	<div class="info">';
				_html += '		<span>作者：4399-灵</span><span>来源：4399.com</span><span>时间：12-07-30</span>';
				_html += '	</div></div>';
				_html += '<div class="bd">';
				_html += '	<h3>造梦西游3宠物快速升级攻略 造梦西游3宠物几级进化？造梦西游3宠物怎么快速升级？</h3>';
				_html += '	<div class="content">';
							//填写内容
				_html += '	</div></div><span class="close" id="j-close"></span></div>';
			_popDiv.innerHTML = _html;
			doc.body.appendChild(_popDiv);
			
			QF.$('j-close').addEventListener('click',function(e){
				that.closePop(this);
				e.stopPropagation();
			})
		},
		closePop : function(closeObj){
			var that = this;
			if( QF.$(that.option.popID)){
				QF.$(that.option.maskID).style.display = 'none';
				doc.body.removeChild(QF.$(that.option.popID));
				closeObj = null;
			}
		},
		initPop : function(){
			var that = this;
			doc.addEventListener('click',function(e){
				var _target = e.target,_node = null;
				var _nodeTarget = _target.nodeName.toLowerCase();
				if( _nodeTarget == 'a' || _nodeTarget == 'img'){
					if( _nodeTarget == 'img'){
						_node = _target.parentNode;
					}else{
						_node = _target;
					}
					if( !_node.getAttribute(that.option.dataPro) ){
						return;
					}
					that.createMask();
					that.createPop();
					e.stopPropagation();
				}
				
			},false);
		}
	};
	win.ZMXY = ZMXY;
})(window);
