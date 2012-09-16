<?php
    require_once('module/config.php');
    $state = 0; //未登录
    $ptitle = "登录";
    $$loginTip = "";
    if( isset($_POST['email']) && isset( $_POST['pwd']) ){
        $email = $_POST['email'];
        $pwd = $_POST['pwd'];
        $loginSql = "select id from tb_user where email = '$email' and pwd = '$pwd'";
        $result = querySql($loginSql);
        if( $result && $result->num_rows >0 ){
            session_start();
            $rs = $result->fetch_assoc();
            $_SESSION['uid'] = $rs['id'];
            header("Location:daily.php?uid=$rs[id]");
        }else{
            $loginTip = "登录失败,帐号与密码不匹配";
        }
    }
    require_once('header.php');
?>

    <div class="q_form">
        <fieldset>
            <legend>登录</legend>
            <form action="login.php" method="POST" autocomplete="off" enctype="multipart/form-data">
                <p class="login_tip"><?php echo $loginTip ?></p>
                <div class="q_dv">
                    <label class="q_field">邮箱：</label>
                    <input type="email" class="q_ipt" name="email" value=""/>
                </div>
                <div class="q_dv">
                    <label class="q_field">密码：</label>
                    <input type="password" class="q_ipt" value="" name="pwd"/>
                </div>
                <div class="q_do">
                    <input type="submit" value="登录" class="q_submit"/>
                </div>
            </form>
        </fieldset>
    </div>
<?php
    require_once('footer.php');
?>