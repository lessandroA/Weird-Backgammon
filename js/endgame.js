function removeEvents(){
    for(let i = 1; i <= 24; i++){
        document.getElementById("col"+i).removeEventListener("click", movePawns);
    }
}

function endgame(){
    string = "gameID=" + gameID + "&color=" + color;
    fetch("endgameAPI.php?" + string)
    .then(res => res)
    .then(data => {
        console.log(data);
        alert("Partita finita!");
        window.location.replace("../index.php");
    });

    // Rimuovo tutti gli event listeners
    removeEvents();
}