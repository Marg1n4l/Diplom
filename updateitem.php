<?php

    header("Access-Control-Allow-Origin: *");

    $ontitle = isset($_POST['ontitle']) ? filter_var(trim($_POST['ontitle']), FILTER_SANITIZE_STRING) : null;
    $title = isset($_POST['title']) ? filter_var(trim($_POST['title']), FILTER_SANITIZE_STRING) : null;
    $description = isset($_POST['description']) ? filter_var(trim($_POST['description']), FILTER_SANITIZE_STRING) : null;
    $price = isset($_POST['price']) ? filter_var(trim($_POST['price']), FILTER_SANITIZE_STRING) : null;
    $img = isset($_POST['img']) ? filter_var(trim($_POST['img']), FILTER_SANITIZE_STRING) : null;
    $category = isset($_POST['category']) ? filter_var(trim($_POST['category']), FILTER_SANITIZE_STRING) : null;

    $mysql = new mysqli("localhost", "root", "", "my-shop");
    if ($mysql->connect_error) {
        die("Error: failed to connect to the database");
    }

    $sql = "UPDATE items SET ";
    $params = array();
    if ($title) {
        $sql .= "title = ?, ";
        $params[] = $title;
    }
    if ($description) {
        $sql .= "description = ?, ";
        $params[] = $description;
    }
    if ($price) {
        $sql .= "price = ?, ";
        $params[] = $price;
    }
    if ($img) {
        $sql .= "img = ?, ";
        $params[] = $img;
    }
    if ($category) {
        $sql .= "category = ?, ";
        $params[] = $category;
    }
    $sql = rtrim($sql, ", "); 
    $sql .= " WHERE title = ?";
    $params[] = $ontitle;
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