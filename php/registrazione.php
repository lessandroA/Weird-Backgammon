<?php

    session_start();

    include 'mysql.php';
   
    $pswHash = md5($_POST['password']);

    $query = '  INSERT INTO utenti (id, username, password, email)  
                VALUES (default, ?, ?, ?)';

    $stmnt = $mysqli->prepare($query);

    $stmnt->bind_param("sss", $_POST['user'], $pswHash, $_POST['email']);

    $query_result = $stmnt->execute();

    if(!$query_result){
        $_SESSION['invalidSignup'] = true;
        header('Location: signUp.php');
    } else {
        $_SESSION['invalidSignup'] = false;
    }
?>

<head>
    <meta name="author" content="Alessandro Corsi">
    <meta charset="UTF-8">
    <title>Registrazione</title>
    <link rel="stylesheet" type="text/css" href="../css/login_style.css">
    <link rel="shortcut icon" href="../images/bckgmn.png">
</head>
<body>
    <?php
        include '../html/header.html';
    ?>
    <!-- Test temporaneo -->
    <?php
        if($query_result){
            $_SESSION['logged'] = TRUE;
            $_SESSION['user'] = $_POST['user'];
            header('Location: ../index.php');
        } else { 
            echo $mysqli->error;
        }
    ?>
</body>