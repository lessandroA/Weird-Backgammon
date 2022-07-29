<?php
    session_start();

    include "mysql.php";

    $query = "SELECT * FROM utenti WHERE username = ?";

    $stmnt = $mysqli->prepare($query);

    $stmnt->bind_param("s", $_GET['user']);

    $stmnt->execute();

    $result = $stmnt->get_result();

    $idNewGame = NULL;

    // Seleziono l'id della partita più recennte tra i due giocatori, fatta partire dall'avversario

    if(!empty($result) && $result->num_rows != 0){
        $query = "  SELECT id 
                        FROM partite 
                        WHERE player2 = ? AND player1 = ?
                              AND finished = 0 
                        ORDER BY tstamp DESC
                        LIMIT 1"; 
        
        $stmnt = $mysqli->prepare($query);
        $stmnt->bind_param("ss", $_SESSION['user'], $_GET['user']);

        $stmnt->execute();

        //$idNewGame = $mysqli->query($sql_stmnt);
        
        $idNewGame = $stmnt->get_result();
        if($idNewGame->num_rows){
            $idNewGame = $idNewGame->fetch_row();
            $idNewGame = $idNewGame[0];
        }
    }

    if(!(empty($result) || $result->num_rows == 0 || $_SESSION['user'] == $_GET['user'] || $idNewGame == NULL))
        $_SESSION["color"] = "black";

    $return = array("rv" => !(empty($result) || $result->num_rows == 0 || $_SESSION['user'] == $_GET['user'] || $idNewGame == NULL),  //$rv = 1 -> Opponent found
                    "id" => $idNewGame);

    print(json_encode($return));
?>