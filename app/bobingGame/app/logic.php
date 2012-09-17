<?php
require_once 'model.php';
$model = new Model();
$method = $_GET['method'];
session_start();
if($method == 'check'){
	$name = isset($_POST['name'])?$_POST['name']:'';
	$pwd = isset($_POST['pwd'])?$_POST['pwd']:'';
	if(!empty($name) && !empty($pwd)){
		$info = array('name' => $name,'pwd' => $pwd);
		$result = $model->check($info);
	}
	header('Location: ../bobing.php');
}

if($method == 'addJifen'){
	if(isset($_SESSION['user']['id'])){
		$jifen = $_GET['jifen'];
		$result = $model->addJifen($jifen,$_SESSION['user']['id']);
		if(!$result){
			echo '你今天的博饼次数用完了！';
		}
	}	
}

if($method == 'logout'){
	unset($_SESSION['data']);
	unset($_SESSION['user']);
	header('Location:../bobing.php');
}

if($method == 'getSession'){
	if(isset($_SESSION['user']['id'])){
		echo 'success';
	}else{
		echo 'false';
	}
}

if($method == 'getCount'){
	if(isset($_SESSION['user']['id'])){
		$result = $model->getUser($_SESSION['user']['id']);
		echo $result['count'];
	}
}

if($method == 'getUser'){
	if(isset($_SESSION['user']['id'])){
		$result = $model->getUser($_SESSION['user']['id']);
		echo json_encode($result);
	}
}

if($method == 'getList'){
	$result = $model->getInfo(9);
	echo json_encode($result);
}