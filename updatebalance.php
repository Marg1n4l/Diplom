<?php


header("Access-Control-Allow-Origin: *");


header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my-shop";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$id = $_GET["id"];
$balance = $_GET["balance"];

$sql = "UPDATE users SET balance='$balance' WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
  echo json_encode(array("message" => "Balance updated successfully"));
} else {
  echo json_encode(array("message" => "Error updating balance: " . $conn->error));
}

$conn->close();
?>
