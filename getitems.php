<?php

  header("Access-Control-Allow-Origin: *");

  header('Content-Type: application/json');

  $conn = mysqli_connect("localhost", "root", "", "my-shop");

  $result = mysqli_query($conn, "SELECT * FROM items");

  $items = array();

  while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
  }

  mysqli_close($conn);

  echo json_encode($items);

?>