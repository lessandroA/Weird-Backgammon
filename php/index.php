<!DOCTYPE html>
<?php
    session_start();
    $_SESSION['invalidSignup'] = FALSE;
    include 'mysql.php';
?>
<head>
    <meta name="author" content="Alessandro Corsi">
    <meta charset="UTF-8">
    <title>Weird Backgammon</title>
    <link rel="stylesheet" type="text/css" href="../css/firstPage.css">
    <link rel="shortcut icon" href="../images/bckgmn.png">
    <script src="../js/ajax/home_game.js"></script>
</head>
<body onload="main()">
    <?php
        include '../html/header.html';
        include 'navbar.php';
        if(!isset($_SESSION['logged']) || $_SESSION['logged'] == FALSE){
            echo "
            <div id=\"container\">
                <div id=\"box\">
                    <div id=\"box-text\">Welcome to Weird Backgammon!</div>
                    <div class=\"break-item\"></div>
                    <div class=\"break-item\"></div>
                    <div class=\"break-item\"></div>
                    <a href=\"login.php\" class=\"button\">
                        Login
                    </a>
                    <a href=\"signUp.php\" class=\"button\">
                        Sign up
                    </a>
                </div>
            </div>
            ";
        } else {
            include 'home_game.php';
        }

        ?>
    </body>