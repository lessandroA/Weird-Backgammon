<?php
    include "mysql.php";
    
//    print_r($_GET);

    $query = "\nUPDATE statopartita \nSET \n";

    for($i = 1; $i <= 24; $i++){
        $color_string = $_GET['color'.$i] == null ? "null" : $_GET['color'.$i];
        $color_attribute = 'color'.$i;
        $number_attribute = "pawn" .$i;
        $number_string = $_GET['number'.$i] == null ? "null" : $_GET['number'.$i];
        $addedString = $color_attribute. " = \"". $color_string. "\", \n" .$number_attribute ." = " .$number_string .", \n";
        $query = $query . $addedString;
    }

    $query = $query . "turnNumber = " .$_GET['turnNumber'];
    $query = $query . ",\nturn = \"" .$_GET['nextTurn'] . "\"";
    $query = $query . ",\nhasEatenBlack = " .$_GET['hasEatenBlack'];
    $query = $query . ",\nhasEatenRed = " .$_GET['hasEatenRed'];
    $query = $query . ",\neatenRedNumber = " .$_GET['eatenRedNumber'];
    $query = $query . ",\neatenBlackNumber = " .$_GET['eatenBlackNumber'];
    $query = $query . ",\noutRed = " .$_GET['outRed'];
    $query = $query . ",\noutBlack = " .$_GET['outBlack'];

    $query = $query . "\nWHERE gameID = ". $_GET['id']; 

    $mysqli->query($query);

    echo json_encode($_GET);
//    echo $query;
    

?>