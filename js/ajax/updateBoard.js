var currentTurnNumber;
var currentTurn;
var timerInterval;
var rolls = new Array(2);
var currentBoard = new Array(24);
var movingPawns = false;
var pawnSelected = false;
var selectedCell;
var needToRefresh = false;
var hasEatenBlack = false; // True se il nero deve partire dalla pedina mangiata
var hasEatenRed = false;
var eatenBlackNumber = 0;
var eatenRedNumber = 0;
var movingFromBase = false;
var movingFromBaseNumber = 0;
var allPawnsInHome = false;
var outRed;
var outBlack;

function loadBoard(){
    fetch("../php/boardAPI.php?id="+gameID)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        currentTurnNumber = data["turnNumber"];
        currentTurn = data["turn"];
        for(let i = 1; i <= 24; i++){
            let pawnNumber = data["pawn"+i];
            console.log(pawnNumber);
            let pawnColor = data["color"+i];
            console.log(pawnColor);
            let currentDiv = document.getElementById("col"+i);
            if(pawnNumber != 0 && pawnNumber != null){
                for(let j = 0; j < pawnNumber; j++){
                    let newPawn = document.createElement("div");
                    newPawn.className = pawnColor;
                    currentDiv.appendChild(newPawn);
                }
            }
            currentBoard[i-1].color = pawnColor;
            currentBoard[i-1].number = pawnNumber;
        }
        if(color != currentTurn){
            document.getElementById("diceRolling").disabled = true;
        }

        hasEatenRed = data["hasEatenRed"];
        hasEatenBlack = data["hasEatenBlack"];
        eatenBlackNumber = data["eatenBlackNumber"];
        eatenRedNumber = data["eatenRedNumber"];

        console.log(hasEatenBlack, hasEatenRed, eatenBlackNumber, eatenRedNumber);

        if(data["hasEatenRed"] == true){
            let howManyEaten  = data["eatenRedNumber"];
            console.log("HowManyEatenRed = ",howManyEaten);
            for(let j = 0; j < howManyEaten; j++){
                let newPawn = document.createElement("div");
                newPawn.className = "red";
                document.getElementById("divider-bottom").appendChild(newPawn);
            }
            if(color == "red"){
                movingFromBase = true;
                movingFromBaseNumber = eatenRedNumber;
            }
        }
        if(data["hasEatenBlack"] == true){
            let howManyEaten  = data["eatenBlackNumber"];
            console.log("HowManyEatenBlack = ",howManyEaten);
            for(let j = 0; j < howManyEaten; j++){
                let newPawn = document.createElement("div");
                newPawn.className = "black";
                document.getElementById("divider-top").appendChild(newPawn);
            }
            if(color == "black"){
                movingFromBase = true;
                movingFromBaseNumber = eatenBlackNumber;
            }
        }
        console.log("Current board in loadBoard: ", currentBoard);


        outRed = data["outRed"];
        outBlack = data["outBlack"];
        let outRedColumn = document.getElementById("red-container")
        let outBlackColumn = document.getElementById("black-container")

        for(let i = 0; i < outRed; i++){
            let newPawn = document.createElement("div");
            newPawn.className = "red";
            outRedColumn.appendChild(newPawn);
        }
        for(let i = 0; i < outBlack; i++){
            let newPawn = document.createElement("div");
            newPawn.className = "black";
            outBlackColumn.appendChild(newPawn);

        }
        
        if(outBlack == 15 || outRed == 15){
            let winner = (outRed == 15) ? "il rosso!" : "il nero!";
            alert("Partita finita! Ha vinto " + winner);
            removeEvents();
            window.location.replace("../index.php");
        }

        allPawnsInHome = checkPawnInHome();
        /*
        if(allPawnsInHome)
        alert("All pawns in home");
        */
    })
}

function clearBoard(){
    for(let i = 1; i <= 24; i++){
        const currentDiv = document.getElementById("col" + i);
        console.log(currentDiv.innerHTML);
        currentDiv.innerHTML = "";
    }
    document.getElementById("divider-top").innerHTML = "";
    document.getElementById("divider-bottom").innerHTML = "";
    document.getElementById("red-container").innerHTML = "";
    document.getElementById("black-container").innerHTML = "";

}

function refreshBoard(){
    fetch("../php/boardAPI.php?id="+gameID)
    .then(res => res.json())
    .then(data => {
       // console.log(data["turnNumber"], currentTurnNumber);
        if(data["turnNumber"] > currentTurnNumber)
            needToRefresh = true;    
    });


    if(needToRefresh){
        console.log("Refresh");
        // Aggiornare i bottoni
        clearBoard();
        loadBoard();
        needToRefresh = false;
        switchTurn();
    }
}

function main(){

    for(let i = 1; i <= 24; i++){
        currentBoard[i-1] = {
            color : null,
            number: null
        };
        document.getElementById("col"+i).addEventListener("click", movePawns);
    }

    loadBoard();

    timerInterval = setInterval(refreshBoard, 800);
    document.getElementById("diceRolling").addEventListener("click", diceRoll);
    console.log(JSON.stringify(currentBoard));
}
