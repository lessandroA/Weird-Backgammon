<?php
    session_start();

    include "mysql.php";

//    echo "{$_GET['user']} \n";

    $query = "SELECT * FROM utenti WHERE username = ?";

    $stmnt = $mysqli->prepare($query);

    $stmnt->bind_param("s", $_GET['user']);

    $stmnt->execute();

    $result = $stmnt->get_result();

    $idNewGame = NULL;


    if(!empty($result) && $result->num_rows != 0){
        $query = "  INSERT INTO partite(player1, player2) 
                        VALUES (?,?)";

        $stmnt = $mysqli->prepare($query);
        $stmnt->bind_param("ss", $_SESSION['user'], $_GET['user']);
        
        $stmnt->execute();
        
        // dopo aver inserito la partita, prendo l'id
        $query = "  SELECT id 
                        FROM partite 
                        WHERE player1 = ? AND player2 = ?
                              AND finished = 0 
                        ORDER BY tstamp DESC
                        LIMIT 1"; 
        
        $stmnt = $mysqli->prepare($query);
        $stmnt->bind_param("ss", $_SESSION['user'], $_GET['user']);
        
        $stmnt->execute();

        $idNewGame = $stmnt->get_result();
        
        $idNewGame = $idNewGame->fetch_row();
        $idNewGame = $idNewGame[0];
    }

    if(!(empty($result) || $result->num_rows == 0 || $_SESSION['user'] == $_GET['user'])){
        $_SESSION['color'] = "red";
        $stmnt = " INSERT INTO statopartita(gameID) VALUES (" .$idNewGame . ")";
        $mysqli->query($stmnt); 
    }

    $return = array("rv" => !(empty($result) || $result->num_rows == 0 || $_SESSION['user'] == $_GET['user']),  //$rv = 1 -> Opponent found
                    "id" => $idNewGame);

    print(json_encode($return));
?>