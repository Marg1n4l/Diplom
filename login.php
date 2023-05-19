<?php

    header("Access-Control-Allow-Origin: *");

    $login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
    $pass = filter_var(trim($_POST['password']), FILTER_SANITIZE_STRING);

    $pass = md5($pass."sfdfsd145");

    $mysql = new mysqli("localhost", "root", "", "my-shop");

    $result = $mysql->query("SELECT * FROM users WHERE login='$login' AND password='$pass'");
    $user = $result->fetch_assoc();

    if(!$user){
        echo "Користувача з таким логіном та паролем не знайдено!";
        exit();
    }

    setcookie('user_id', $user['id'], time() + 3600, "/");
    
    $mysql->close(); 

    header('Location: http://localhost:3000');

?>