<?php

header("Access-Control-Allow-Origin: *");

$title = filter_var(trim($_POST['title']), FILTER_SANITIZE_STRING);

$mysqli = new mysqli("localhost", "root", "", "my-shop");
if ($mysqli->connect_error) {
    die("Error: failed to connect to the database");
}

$stmt = $mysqli->prepare("DELETE FROM items WHERE title=?");
if (!$stmt) {
    die("Error: " . $mysqli->errno . " - " . $mysqli->error);
}

$stmt->bind_param("s", $title);
$stmt->execute();

$stmt->close();
$mysqli->close();

header('Location: http://localhost:3000');

exit();

?>
