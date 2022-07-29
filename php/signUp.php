<!DOCTYPE html>
<head>
    <meta name="author" content="Alessandro Corsi">
    <meta charset="UTF-8">
    <title>Registrazione</title>
    <link rel="stylesheet" type="text/css" href="../css/signUp_style.css">
    <link rel="shortcut icon" href="../images/bckgmn.png">
    <script src="../js/check_signUp.js"> </script>
    <?php

        session_start();

        if(isset($_SESSION['invalidSignup']) && $_SESSION['invalidSignup'] == true){
            echo    "<style>
                        #user-input{
                            background-color: #ffc2b3;
                        }
                    </style>";
            
            echo    "<script>
                        alert(\"Invalid Username\");
                     </script>";
            $_SESSION['invalidSignup'] = false;
        }
    ?>
</head>
<body onload=begin()>
    <?php
        include '../html/header.html';
        include '../php/navbar.php';
    ?>
    <div id="container">
        <div id="box">
            <form action="registrazione.php" method="post">
                <div id="signup-title">Registrazione </div>
                <br>
                <div id="usernameInput" class="input-div">Username <br>
                <!-- Pattern preso e poi modificato dal sito 
                https://stackoverflow.com/questions/1221985/how-to-validate-a-user-name-with-regex/37658211-->
                <input name="user" required pattern="^[a-zA-Z0-9]+([a-zA-Z0-9](_|.)[a-zA-Z0-9])*[a-zA-Z0-9]+$" id="user-input"> </div>
                <div class="input-div">Indirizzo email <br>
                <input name="email" required type="email"> </div>
                <div class="input-div"> Password  <br>
                <input name="password" required type="password" id="firstPsw"> </div>
                <div class="input-div"> Conferma password <br>
                <input name="password_confirmation" required type="password" id="secondPsw"> </div>
                <div id="button-div">
                    <button id="signup-button">Registrati</button>
                </div>
            </form>
        </div>
    </div>
</body>