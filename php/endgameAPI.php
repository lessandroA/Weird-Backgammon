<?php
    session_start();

    include "mysql.php";


    $query = "SELECT * FROM statopartita WHERE gameID=?";

    $stmnt = $mysqli->prepare($query);
    $stmnt->bind_param("i", $_GET['gameID']);

    $stmnt->execute();

    $result = $stmnt->get_result();

    $row = $result->fetch_assoc();
    print_r($row);

    if  ( 
        ($_GET['color'] == "red" && $row['outRed'] < 15) ||
        ($_GET['color'] == "black" && $row['outBlack'] < 15) ||
        ($_GET['color'] != "black" && $_GET['color'] != "red")
        )
        {
        header("Location: index.php");
    }

    $query = "SELECT * FROM partite WHERE id=?";

    $stmnt = $mysqli->prepare($query);
    $stmnt->bind_param("i", $_GET['gameID']);

    $stmnt->execute();

    $result = $stmnt->get_result();

    $row = $result->fetch_assoc();

    print("\n");
    print_r($row);

    $player1 = $row['player1'];
    $player2 = $row['player2'];

    $winner = $_GET['color'] == "red" ? $player1 : $player2;
    $loser = $_GET['color'] == "red" ? $player2 : $player1;

    $queryUpdateGame = "UPDATE partite SET finished = 1, winner = \"". $winner ."\" WHERE id=?";
    $stmntUpdateGame = $mysqli->prepare($queryUpdateGame);

    $stmntUpdateGame->bind_param("i", $_GET['gameID']);

    echo $queryUpdateGame;

    $stmntUpdateGame->execute();

    //Aggiorno il numero di partite vinte

    $queryUpdatePlayedGames = " UPDATE utenti 
                                SET partite_giocate = partite_giocate + 1
                                WHERE username = \"" .$player1 . "\" OR username = \"" .$player2 . "\"";

    echo $queryUpdatePlayedGames;

    $mysqli->query($queryUpdatePlayedGames);

    $queryUpdateWins = "UPDATE utenti 
                        SET partite_vinte = partite_vinte + 1
                        WHERE username = \"" . $winner . "\"";
    
    echo $queryUpdateWins;

    $mysqli->query($queryUpdateWins);

    $queryUpdateDefeats = " UPDATE utenti
                            SET partite_perse = partite_perse + 1
                            WHERE username = \"" . $loser . "\"";

    echo $queryUpdateDefeats;

    $mysqli->query($queryUpdateDefeats);
?>