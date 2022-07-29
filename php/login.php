<!DOCTYPE html>
<?php
    session_start();
    if(isset($_SESSION['logged']) && $_SESSION['logged'] == TRUE){
        header('Location: index.php');
    }
    if(isset($_SESSION['invalidLogin']) && $_SESSION['invalidLogin'] == TRUE){
        echo
            "  
                <script>
                    alert(\"Incorrect username and/or password\"); 
                </script>
            ";
            $_SESSION['invalidLogin'] = FALSE;
    }
?>
<head>
    <meta name="author" content="Alessandro Corsi">
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="../css/login_style.css">
    <link rel="shortcut icon" href="../images/bckgmn.png">
</head>
<body>
    <?php
        include '../html/header.html';
        include 'navbar.php';
    ?>
    <div id="container">
        <div id="box">
            <form action="authenticate.php" method="post">
                <div id="login-title">Login</div>
                <p>Username</p>
                <input name="user" required> 
                <p>Password</p>
                <input name="password" required type="password">
                <div id="button-div">
                    <button>Sign in</button>
                </div>
            </form>
        </div>
    </div>
</body>