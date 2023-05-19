<?php

    header("Access-Control-Allow-Origin: *");

    if(!isset($_GET['userId']) || empty($_GET['userId'])) {
        die("Error missing id");
    }
    
    $id = $_GET['userId'];

    $phone = isset($_POST['phone']) ? filter_var(trim($_POST['phone']), FILTER_SANITIZE_STRING) : null;
    $city = isset($_POST['city']) ? filter_var(trim($_POST['city']), FILTER_SANITIZE_STRING) : null;
    $postal = isset($_POST['postal']) ? filter_var(trim($_POST['postal']), FILTER_SANITIZE_STRING) : null;

    $date_str = isset($_POST['date']) ? $_POST['date'] : null;
    if ($date_str) {
        $date = new DateTime($date_str);
        $date_str = $date->format('Y-m-d');
    }

    $mysql = new mysqli("localhost", "root", "", "my-shop");
    if ($mysql->connect_error) {
        die("Error: failed to connect to the database");
    }

    $sql = "UPDATE users SET ";
    $params = array();
    if ($phone) {
        $sql .= "phone = ?, ";
        $params[] = $phone;
    }
    if ($city) {
        $sql .= "city = ?, ";
        $params[] = $city;
    }
    if ($date_str) {
        $sql .= "date = ?, ";
        $params[] = $date_str;
    }
    if ($postal) {
        $sql .= "postal = ?, ";
        $params[] = $postal;
    }
    $sql = rtrim($sql, ", "); 
    $sql .= " WHERE id = ?";
    $params[] = $id;
    $stmt = $mysql->prepare($sql);
    if ($stmt === false) {
        die("Error: failed to prepare statement. " . $mysql->error);
    }
    $types = str_repeat("s", count($params)); 
    $stmt->bind_param($types, ...$params); 
    if (!$stmt->execute()) {
        die("Error: failed to execute query");
    }
    $stmt->close();

    $mysql->close();
    
    header('Location: http://localhost:3000');

    exit();
    
?>


