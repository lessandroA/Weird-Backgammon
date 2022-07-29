<?php
    session_start();

    include "mysql.php";

    $md5 = md5($_POST['password']);

//    $loginQuery = "SELECT password FROM utenti WHERE username = '{$_POST['user']}'";

    $loginQuery = "SELECT password FROM utenti WHERE username = ?";
    
    $stmnt = $mysqli->prepare($loginQuery);
    $stmnt->bind_param("s", $_POST['user']);

    $stmnt->execute();

    $query_result = $stmnt->get_result();

    if($query_result->num_rows == 0){
        $_SESSION['invalidLogin'] = TRUE;
        echo "User sbagliato";
        header('Location: login.php');
    } else {
        $resultRow = $query_result->fetch_row();
        if($resultRow[0] == $md5){
            $_SESSION['invalidLogin'] = FALSE;
            $_SESSION['logged'] = TRUE;
            $_SESSION['user'] = $_POST['user'];
            header('Location: ../index.php');
        } else {
            $_SESSION['invalidLogin'] = TRUE;
            header('Location: login.php');
        }
    }
?>