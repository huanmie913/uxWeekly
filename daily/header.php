<?php
    session_start();
    require_once('module/config.php');
    $nickname = "";
    if( isset($_SESSION['uid'])){
        /*
		  * 权限管理
		  mike : 1
		*/
        $uid = $_SESSION['uid'];
        $uidSql = 'select nickname,ngroup,avatar from tb_user where id ="'. $uid .'"';
        $nresult = querySql($uidSql);
        $nrs = $nresult->fetch_assoc();
        $nickname = $nrs['nickname'];
        $ngroup = $nrs['ngroup'];
        $avatar = $nrs['avatar'];
    }
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title><?php echo $ptitle ?></title>
    <link type="text/css" href="static/css/Q.css" rel="stylesheet"/>
    <link type="text/css" href="static/css/time.css" rel="stylesheet"/>
</head>
<body>
<header class="header clearfix">
    <?php
        if( $state == 1 ){
    ?>
    <div class="info">
        <span class="nickname"><img src="<?php echo $avatar; ?>" class="avatar"/><?php echo $nickname; ?></span>
        <div class="setting" id="j-setting">
            <span>个人资料</span>
            <ul class="dropdown" id="j-sdrop">
                <li><a href="list.php?uid=<?php echo $uid ?>">日报管理</a></li>
                <li><a href="updatepwd.php">修改密码</a></li>
                <li><a href="loginout.php" class="out">退出</a></li>
            </ul>
        </div>
    </div>
    <div  class="logo">4399UED Daily</div>
    <ul class="nav clearfix">
        <li><a href="daily.php?uid=<?php echo $uid ?>">写日报</a></li>

        <!--<li><a href="week.php"><?php echo $ngroup?>日报</a></li>-->
        <li  id="j-dropDown">
            <span>
				<?php if( $uid == 1){ ?>
					部门日报
				<?php }else{?>
					<?php echo $ngroup ?>日报
				<?php }?>
			</span>
            <ol class="nlist" id="j-list">
                <li><a href="week.php?m=list">列表形式</a></li>
                <li><a href="week.php?m=visual">可视化形式</a></li>
            </ol>
        </li>
    </ul>
    <?php }else{ ?>
        <div class="logo">4399UED Daily</div>
    <?php } ?>
</header>
