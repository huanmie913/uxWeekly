<?php session_start();?>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="" content=""/>
<title>bbing</title>
<link href="css/bobing.css" rel="stylesheet" />
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jq.js"></script>
</head>
<body>
<div class="head_wrap">
  <div class="head">
  	<div class="cloud1"></div>
  	<div class="cloud2"></div>
  	<div class="logo"></div>
  	<div class="moon"><div class="moon-in"></div></div>
  </div>
</div>
<div class="loginbox clearfix">
  <div class="login-frm">
    <form action="./app/logic.php?method=check" method="post" id="log-frm">
      <input type="text" name="name" class="login-txt">
      <input type="text" name="pwd" class="login-txt">
      <input type="submit" value="登录" class="login-btn" >
    </form>
    <div id="log-info" style="display:none">用户：<span id='user'></span>积分：<span id='jifen'></span>剩余次数：<span id='count'></span><span><a href="./app/logic.php?method=logout">退出</a></span></div>
  </div>
</div>
<div class="wrap clearfix">
  <div class="game_top right">
    <ul class="toplist">
        <li class="top3"><span>积分<b>X <font id='jifen1'></font></b></span><font id='user1'></font></li>
        <li class="top3"><span>积分<b>X <font id='jifen2'></font></b></span><font id='user2'></font></li>
        <li class="top3"><span>积分<b>X <font id='jifen3'></font></b></span><font id='user3'></font></li>
        <li><span>积分<b>X <font id='jifen4'></font></b></span><font id='user4'></font></li>
        <li><span>积分<b>X <font id='jifen5'></font></b></span><font id='user5'></font></li>
        <li><span>积分<b>X <font id='jifen6'></font></b></span><font id='user6'></font></li>
        <li><span>积分<b>X <font id='jifen7'></font></b></span><font id='user7'></font></li>
        <li><span>积分<b>X <font id='jifen8'></font></b></span><font id='user8'></font></li>
        <li><span>积分<b>X <font id='jifen9'></font></b></span><font id='user9'></font></li>
    </ul>
  </div>
  <div class="game_rule left">
    <div class="game_rule_r right">
      <p>博饼积分<span>+100</span></br>博饼积分<span>+100</span></br>博饼积分<span>+90</span></br>博饼积分<span>+80</span></br>博饼积分<span>+60</span></br>博饼积分<span>+50</span></br>博饼积分<span>+40</span></br>博饼积分<span>+30</span></br>博饼积分<span>+25</span></br>博饼积分<span>+20</span></br>博饼积分<span>+15</span></br>博饼积分<span>+10</span></br></p>
    </div>
    <div class="game_rule_l">
      <p>状元插金花</br>六杯红</br>六杯黑</br>五王</br>五王带一秀</br>五子登科</br>状元</br>对堂</br>三红</br>四进</br>二举</br>一秀</p>
    </div>
  </div>
  <div class="gamebox left">
    <a href="javascript:getSession()" class="start-btn">博一把!</a>
    <div class="bowl">
      <img id="imgbox" src="rollflash/0070.png" width="550" height="400" style="opacity:1; margin:65px 0 0 88px; display:none;" />
      <div id="rollbox">
        <img id="dice1" src ="images/dice1.png" border="0" />
        <img id="dice2" src ="images/dice2.png" border="0" />
        <img id="dice3" src ="images/dice3.png" border="0" />
        <img id="dice4" src ="images/dice4.png" border="0" />
        <img id="dice5" src ="images/dice5.png" border="0" />
        <img id="dice6" src ="images/dice6.png" border="0" />
      </div>   
    </div>
    <div id="res-pop">
      <p id="result"></p>
    </div>
  </div>
</div>
<div class="footer"></div>
<script>
var st=null;
var fi=null;
var box=document.getElementById("rollbox");
var imgbox=document.getElementById("imgbox");
var pop=document.getElementById('res-pop');
function run(){
  clearInterval(st);
  imgbox.style.opacity=1;
  pop.className="pop-ani";
  var r1=document.getElementById("dice1");
  var r2=document.getElementById("dice2");
  var r3=document.getElementById("dice3");
  var r4=document.getElementById("dice4");
  var r5=document.getElementById("dice5");
  var r6=document.getElementById("dice6");
  var arr=[];
  box.style.display="block";
  imgbox.style.display="none";
    for(var i=0;i<6; i++){
      arr[i]=Math.floor(Math.random()*6+1);
    }
  r1.src="images/dice"+arr[0]+".png";
  r2.src="images/dice"+arr[1]+".png";
  r3.src="images/dice"+arr[2]+".png";
  r4.src="images/dice"+arr[3]+".png";
  r5.src="images/dice"+arr[4]+".png";
  r6.src="images/dice"+arr[5]+".png";
    //获奖判断
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;
    var count5 = 0;
    var count6 = 0;
    for(var i=0;i<=5;i++){
      switch(arr[i]){
         case 1:
           count1 += 1;
           break;
         case 2:
           count2 += 1;
           break;
         case 3:
           count3 += 1;
           break;
         case 4:
           count4 += 1;
           break;
         case 5:
           count5 += 1;
           break;
         case 6:
           count6 += 1;
           break;
         default:
           break;
      }
    }
    var result = getResult(count1,count2,count3,count4,count5,count6);
    var inp=document.getElementById("result");
    addJifen(result[1]);
    inp.innerHTML=result[0];
}

function preload(){
  var imgArray = [];
  for(var i=40;i<=70;i++){
      imgArray.push('rollflash/00'+i+'.png');
  }
  for(var j=0;j<imgArray.length;j++){
      var _img = new Image();
      _img.src = imgArray[j];
  }

}

function getResult(count1,count2,count3,count4,count5,count6){
    if(count4 == 6 || count2 == 6){
      return ['六杯红','100'];
    }
    if(count4 == 4 && count1 == 2){
      return ['状元插金花','100'];
    }
    if(count2 == 6 || count3 == 6 || count5 == 6 || count6 == 6){
      return ['六杯黑','90'];
    }
    if(count4 == 5 && count4 != 6){
      return ['五王','80'];
    }
    if((count1 == 5 || count2 ==5 || count3 == 5 || count5 == 5 || count6 == 5) && count4 ==1){
      return ['五王带一秀','60'];
    }
    if((count1 == 5 || count2 ==5 || count3 == 5 || count5 == 5 || count6 == 5) && count4 !=1){
      return ['五子登科','50'];
    }
    if(count4 == 4){
      return ['状元','40'];
    }
    if(count1 == 1 && count2 == 1 && count3 == 1 && count4 == 1 && count5 == 1 && count5 == 1){
      return ['对堂','30'];
    }
    if(count4 == 3){
      return ['三红','25'];
    }
    if(count1 == 4 || count2 == 4 || count3 == 4  || count5 == 4 || count6 == 4){
      return ['四进','20'];
    }
    if(count4 == 2){
      return ['二举','15'];
    }
    if(count4 == 1){
      return ['一秀','10'];
    }
    return ['没中奖哦！','0'];
}

function runimg(){
	imgbox.style.display="block";
	box.style.display="none";
	var curIndex=0;
	var timeInterval=50;
	var arr=new Array();
	for(var n=0; n<54; n++)
	{
	  arr[n]="rollflash/00"+(n+40)+".png";
	}

	function changeImg()
	{
	   if (curIndex==arr.length-1) 
	   {
	       curIndex=0;
	   }
	    else
	   {
	       curIndex+=1;
	   }
	    imgbox.src=arr[curIndex];
	}
	st=setInterval(changeImg,timeInterval);

	var t=setTimeout(run,1530);
	pop.className="";
}
preload();
</script>
</body>
</html>
