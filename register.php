<?php

    header("Access-Control-Allow-Origin: *");

    $name = filter_var(trim($_POST['name']), FILTER_SANITIZE_STRING);
    $login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
    $pass = filter_var(trim($_POST['password']), FILTER_SANITIZE_STRING);

    if(mb_strlen($name) < 2 || mb_strlen($name) > 30){
        echo "Ім'я повинно складатися з 2-30 символів!";
        exit();
    } else if(mb_strlen($login) < 3 || mb_strlen($login) > 15){
        echo "Логін повинен складатися з 3-15 символів!";
        exit();
    } else if(mb_strlen($pass) < 6 || mb_strlen($pass) > 16){
        echo "Пароль повинен складатися з 6-16 символів!";
        exit();
    }

    $mysql = new mysqli("localhost", "root", "", "my-shop");
    if ($mysql->connect_errno) {
        echo "Не вдалось підключитись до MySQL: " . $mysql->connect_error;
        exit();
    }
    $sql = "SELECT id FROM users WHERE login = ? AND password = ?";
    if ($stmt = $mysql->prepare($sql)) {
        $stmt->bind_param("ss", $login, md5($pass."sfdfsd145"));
        $stmt->execute();
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            header('Location: http://localhost:3000');
            exit();
        }
        $stmt->close();
    } else {
        echo "Помилка запиту: " . $mysql->error;
        exit();
    }
    $mysql->close();

    $pass = md5($pass."sfdfsd145");

    $mysqli = new mysqli("localhost", "root", "", "my-shop");

    if ($mysqli->connect_errno) {
        echo "Не удалось подключиться к MySQL: " . $mysqli->connect_error;
        exit();
    }

    if ($stmti = $mysqli->prepare("INSERT INTO users (name, login, password) VALUES (?, ?, ?)")) {
        $stmti->bind_param("sss", $name, $login, $pass);
        $stmti->execute();
        $stmti->close();
        echo "Реєстрація успішна!";
    } else {
        echo "Ошибка запроса: " . $mysqli->error;
    }

    $mysqli->close();

    header('Location: http://localhost:3000');

?>