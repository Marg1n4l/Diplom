<?php

    header("Access-Control-Allow-Origin: *");

    setcookie('user_id', $user['id'], time() - 3600, "/");

    header('Location: http://localhost:3000');

    exit();

?>