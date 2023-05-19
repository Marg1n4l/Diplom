<?php

header("Access-Control-Allow-Origin: *");

header('Content-Type: application/json');

$user_id = filter_var(trim($_GET['id']), FILTER_SANITIZE_STRING);

$mysql = new mysqli("localhost", "root", "", "my-shop");

$result = $mysql->query("SELECT * FROM users WHERE id='$user_id'");
$user = $result->fetch_assoc();

if (!$user) {
    echo "Помилка отримання користувача";
    exit();
}

echo json_encode($user);

$mysql->close();

?>