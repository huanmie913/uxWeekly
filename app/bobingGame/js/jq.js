$(document).ready(function(){
	 getUser();
	 getList();
})

function addJifen($jifen){
	$.ajax({ 
        type: "POST", 
        url: "./app/logic.php?method=addJifen&jifen="+$jifen,
        success: function(response){
        	getUser();
        	getList();
        }
      });
}

function getSession(){
	$.ajax({ 
        type: "POST", 
        url: "./app/logic.php?method=getSession",
        success: function(response){
        	if(response == 'success'){
        		$.ajax({ 
        	        type: "POST", 
        	        url: "./app/logic.php?method=getCount",
        	        success: function(response){
        	        	if(response <= 0){
        	        		alert('你今天的博饼次数用完了！');
        	        	}else{
        	        		runimg();
        	        	}
        	        }
        	      });
        	}else{
        		alert('请先登录哦，╮(╯▽╰)╭');
        	}
        }
      });
}

function getUser(){
	$.ajax({ 
        type: "POST", 
        url: "./app/logic.php?method=getUser",
        success: function(response){
        	if(response == ''){
        		$('#user').text('游客');
            	$('#jifen').text('0');
            	$('#count').text('0');
        	}
        	var json = eval("("+response+")");
        	$('#user').text(json.name);
        	$('#jifen').text(json.jifen);
        	$('#count').text(json.count);
            $('#log-frm').css('display','none');
            $('#log-info').css('display','block');

        }
      });
}

function getList(){
	$.ajax({ 
        type: "POST", 
        url: "./app/logic.php?method=getList",
        success: function(response){
        	var json = eval("("+response+")");
        	for(var i=0;i<9;i++){
        		$('#jifen'+(i+1)).text(json[i].jifen);
        		$('#user'+(i+1)).text(json[i].name);
        	}
        }
      });
}