<!DOCTYPE html>
<?php
    session_start();
    // Devo recuperare le informazioni sulla partita: numero di pedine per colore e colonna
    include "mysql.php";
    $game_ID = $_GET['id'];

    $query = "SELECT player1, player2 FROM partite WHERE id=?";

    $stmnt = $mysqli->prepare($query);

    $stmnt->bind_param("i", $game_ID);

    $stmnt->execute();
    
    $result = $stmnt->get_result();

    //    echo $game_ID;
    
    $row = $result->fetch_row();

    if(!isset($_SESSION['user']) || ($_SESSION['user'] != $row[0] && $_SESSION['user'] != $row[1])){
        header("Location: ../index.php");
    }

?>
<head>    
    <title>Partita</title>
    <link rel="stylesheet" href="../css/board.css">
    <link rel="shortcut icon" href="../images/bckgmn.png">
    <link rel="stylesheet" href="../css/common/">
    <script>
        const gameID = <?php echo $_GET['id']?>;
        const color = <?php echo "\"" .$_SESSION['color'] ."\"" ?>;
    </script>
    <script src="../js/ajax/updateServer.js" defer></script>
    <script src="../js/ajax/updateBoard.js" defer></script>
    <script src="../js/boardUtility.js" defer></script>
    <script src="../js/boardMovement.js" defer></script>
    <script src="../js/endgame.js" defer></script>

</head>
<body onload="main()">
    <?php
        include '../html/header.html';
        include 'navbar.php';
    ?>
    <div id="outer-container">
        <div id="container">
            <div id="background-board">
                <div id="subcontainer-top">
                    <div id="top-left"></div>
                    <div class="triangle-top" id="col13"></div>
                    <div class="triangle-top" id="col14"></div>
                    <div class="triangle-top" id="col15"></div>
                    <div class="triangle-top" id="col16"></div>
                    <div class="triangle-top" id="col17"></div>
                    <div class="triangle-top" id="col18"></div>
                    
                    <div class="fill"></div>

                    <div id="divider-top"></div>
                    
                    <div class="triangle-top" id="col19"></div>
                    <div class="triangle-top" id="col20"></div>
                    <div class="triangle-top" id="col21"></div>
                    <div class="triangle-top" id="col22"></div>
                    <div class="triangle-top" id="col23"></div>
                    <div class="triangle-top" id="col24"></div>
                </div>
                
                <div id="divider-middle"></div>
                <div id="subcontainer-bottom">
                    <div class="triangle-bottom" id="col12"></div>
                    <div class="triangle-bottom" id="col11"></div>
                    <div class="triangle-bottom" id="col10"></div>
                    <div class="triangle-bottom" id="col9"></div>
                    <div class="triangle-bottom" id="col8"></div>
                    <div class="triangle-bottom" id="col7"></div>
                    
                    <div class="fill"></div>
                    
                    <div id="divider-bottom"></div>
                    
                    <div class="triangle-bottom" id="col6"></div>
                    <div class="triangle-bottom" id="col5"></div>
                    <div class="triangle-bottom" id="col4"></div>
                    <div class="triangle-bottom" id="col3"></div>
                    <div class="triangle-bottom" id="col2"></div>
                    <div class="triangle-bottom" id="col1"></div>
                </div>
            </div>
            <div id="out-container">
                <div id="red-container"></div>
                <div id="black-container"></div>
            </div>
        </div>
        <div id="diceRolling-container">
            <button id="diceRolling">Lancia i dadi!</button> 
            <input type="text" class="diceBox" id="firstRoll" readonly>
            <input type="text" class="diceBox" id="secondRoll" readonly>
        </div>
    </div>
</body>