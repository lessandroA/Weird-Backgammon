<!DOCTYPE html>    
<head>
    <meta name="author" content="Alessandro Corsi">
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" type="text/css" href="../css/account_style.css">
    <link rel="shortcut icon" href="../images/bckgmn.png">
</head>
<?php
    session_start();
    include "mysql.php";

    $accountName = $_SESSION['user'];

    $query = "SELECT username, partite_giocate, partite_vinte, partite_perse FROM utenti WHERE username=?";
    $stmnt = $mysqli->prepare($query);
    $stmnt->bind_param("s", $accountName);

    $stmnt->execute();
    
    $result = $stmnt->get_result();

    $row = $result->fetch_assoc();
?>
<body>
    <?php
        include '../html/header.html';
        include '../php/navbar.php';
    ?>
    <div id="container">
        <div id="stats">
            <?php
                echo "<b>Nome utente: </b>" . $row['username'];
                echo "<b> Partite giocate: </b>" .$row['partite_giocate'];
                echo "<b> Partite vinte: </b>" .$row['partite_vinte'];
                echo "<b> Partite perse: </b>" .$row['partite_perse'];
            ?>
        </div>
        <div id="ranking">
            <div id="ranking-title">Classifica</div>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Partite giocate</th>
                    <th>Partite vinte</th>
                    <th>Partite perse</th>
                    <th>Percentuale di partite vinte</th>
                </tr>
                <?php
                $query = "SELECT username, partite_giocate, partite_vinte, partite_perse FROM utenti ORDER BY partite_vinte DESC LIMIT 50";
                $result_set = $mysqli->query($query);
                while($row = $result_set->fetch_assoc()){
                    if($row['username'] != $_SESSION['user']){
                        echo "<tr>";
                        echo "<td>" .$row["username"] ."</td>";
                        echo "<td>" .$row["partite_giocate"] ."</td>";
                        echo "<td>" .$row["partite_vinte"] ."</td>";
                        echo "<td>" .$row["partite_perse"] ."</td>";       
                        echo "<td>" . ($row["partite_giocate"] == 0 ? 0 : ($row["partite_vinte"] /$row["partite_giocate"] * 100 )) ."%</td>";       
                        echo "</tr>";
                    } else {
                        echo "<tr class=\"enlightened\">";
                        echo "<td>" .$row["username"] ."</td>";
                        echo "<td>" .$row["partite_giocate"] ."</td>";
                        echo "<td>" .$row["partite_vinte"] ."</td>";
                        echo "<td>" .$row["partite_perse"] ."</td>";       
                        echo "<td>" . ($row["partite_giocate"] == 0 ? 0 : ($row["partite_vinte"] /$row["partite_giocate"] * 100 )) ."%</td>";       
                        echo "</tr>";
                    }
                }
                ?>  
            </table>
        </div>
    </div>
</body>