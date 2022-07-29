<?php
    $host = 'localhost';
    $user = 'root';
    $psw = '';
    $db = 'backgammondb';

    $mysqli = new mysqli($host, $user, $psw, $db);

    if($mysqli->connect_errno){
        echo "FAILED. Error: " . $mysqli->connect_error;
        exit();
    }
?>