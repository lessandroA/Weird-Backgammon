<?php
    session_start();
    $_SESSION['logged'] = FALSE;
    header('Location: index.php');
?>