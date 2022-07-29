<?php
    include "mysql.php";
    $query = "SELECT * FROM statopartita WHERE gameID=?";
    $stmnt = $mysqli->prepare($query);
    $stmnt->bind_param("i", $_GET['id']);

    $stmnt->execute();
    
    $result = $stmnt->get_result();

    $row = $result->fetch_assoc();

    print(json_encode($row));
?>