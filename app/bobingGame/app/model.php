<?php
class Model{
	public function __construct(){
		$host = 'localhost';//服务器地址
		$root = 'root';//用户
		$pwd = '';//密码
		$this->db = mysql_connect($host,$root,$pwd);
		mysql_select_db('bobing');
	}
	
	public function check($info){
	    $rs = mysql_query("select * from user where name = '".$info['name']."' and password = '".$info['pwd']."'");
	    $result = mysql_fetch_assoc($rs);
	    while($result){
	    	session_start();
	    	$_SESSION['user'] = $result;
	    	return true;
	    }
	    return false;
	}
	
	public function getUser($id){
		$rs = mysql_query("select * from user where id='".$id."'");
		$result = mysql_fetch_assoc($rs);
		if($result){
			return $result;
		}
	}
	
	public function getInfo($max){
		$i = 0;
		$rs = mysql_query("select * from user where jifen > 0 order by jifen desc limit 0,$max");
		while($row = mysql_fetch_assoc($rs)){
		   $data[$i] = $row;
		   $i++;
		}
		return $data;
	}
	
	public function addJifen($jifen,$id){
		$res = mysql_query("select * from user where id='".$id."'");
		$result = mysql_fetch_assoc($res);
		if($result['count']>0){
			$rs = mysql_query("update user set jifen = jifen + $jifen where id = $id");
			mysql_query("update user set count = count-1 where id = $id");
		    if($rs){
			   return true;
		    }
		}
		return false;
	}
}