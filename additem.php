<?php

    header("Access-Control-Allow-Origin: *");

    $host = 'localhost'; 
    $username = 'root'; 
    $password = ''; 
    $dbname = 'my-shop'; 
    $conn = mysqli_connect($host, $username, $password, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $description = mysqli_real_escape_string($conn, $_POST['description']);
    $price = mysqli_real_escape_string($conn, $_POST['price']);
    $img = mysqli_real_escape_string($conn, $_POST['img']);
    $category = mysqli_real_escape_string($conn, $_POST['category']);

    if (!$img){
        $img = 'default.png';
    }


    $sql = "INSERT INTO items (title, description, price, img, category) VALUES ('$title', '$description', '$price', '$img', '$category')";

    if (mysqli_query($conn, $sql)) {
        echo "Данные успешно добавлены в таблицу";
    } else {
        echo "Ошибка: " . $sql . "<br>" . mysqli_error($conn);
    }

    mysqli_close($conn);

    header('Location: http://localhost:3000');

    exit();

?>