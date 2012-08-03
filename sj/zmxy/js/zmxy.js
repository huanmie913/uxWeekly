/*window.addEventListener('load',function(){
     setTimeout(function(){
          window.scrollTo(0,1);
     },0)
},false);*/

(function(win,undefined){
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

	function Slide(){
		this.option = {
			containerID : 'j-sone',
			scrollBarID : 'j-sbone',
			ctag        : 'ul',
			num         : 1
		}
		this.container = QF.$(this.option.containerID),
		this.scrollBar = QF.$(this.option.scrollBarID).querySelectorAll('span')[0],
		this.containerWidth = this.scrollBarWidth = this.containerLenth = 0;
		 
		if( ! (this instanceof arguments.callee) ){
			return new arguments.callee();
		}
	}
	Slide.prototype = {
		setInit : function(){
			var that = this;
			var _containerChild = that.container.querySelectorAll(that.option.ctag);
			that.containerWidth = parseInt(QF.getCssProperty(_containerChild[0],'width'));
			that.containerLenth = _containerChild.length;
			that.container.style.width = (that.containerWidth*that.containerLenth)+"px";
			that.scrollBarWidth = that.scrollBar.style.width =( (that.containerWidth-2) / that.containerLenth)-2+"px";
			that.setScroll(that.option.num);
		},
		setScroll : function(i){
			var that =this;
			that.scrollBar.style.left = ( (parseInt(that.scrollBarWidth)+2) * i)+"px";
			that.container.style.left = (-that.containerWidth * i)+"px";
		},
		doEvent : function(){
			var that = this;
			var _spx = _epx =0;
			var i = 0;
			QF.$(this.option.containerID).addEventListener('touchstart',function(ev){
				_spx = ev.touches[0].pageX;
				ev.stopPropagation();
			},false);
			QF.$(this.option.containerID).addEventListener('touchend',function(ev){
				_epx = ev.touches[0].pageX;
			},false);
			QF.$(this.option.containerID).addEventListener('touchmove',function(ev){
				//_mpx = ev.touches[0].pageX;
				//向后
				if( _epx - _spx >= 20 ){
					doRight();
				}
				if( _spx - _epx >= 20 ){
					doLeft();
				} 

			},false);

			function doRight(){
				i++;
				if(i >= that.containerLenth ){
					return;
				}
				that.setScroll(i);
			}
			function doLeft(){
				i--;
				if(i <=0 ){
					return;
				}
				that.setScroll(i);
			}
			
		},
		initSlide : function(){
			var that = this;
			that.setInit();
			that.doEvent();
		}
	};

	win.ZMXY = ZMXY;
	win.Slide = Slide;
})(window);
