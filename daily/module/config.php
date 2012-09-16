<?php

    //数据库配置
    $tmConfig = array('host'=>'localhost','name'=>'root','pwd'=>'zheng0310','db'=>'db_tm');


    $con = mysql_connect($tmConfig['host'],$tmConfig['name'],$tmConfig['pwd']);
    mysql_select_db($tmConfig['db'],$con);
    mysql_query("set names utf8");
    function DB_Connect(){
        global $tmConfig;

        @ $connect = new mysqli($tmConfig['host'],$tmConfig['name'],$tmConfig['pwd'],$tmConfig['db']);

        $connect->query("SET NAMES UTF8");

        if(mysqli_connect_errno()){
            exit;
        }
        return $connect;
    }

    function querySql($sql,$charset="utf8"){
        $conn = DB_Connect();
        $result = $conn->query($sql);
        if(!$result){
            //$conn->close();
            exit;
        }
        //$conn->close();
        return $result;
    }

?>