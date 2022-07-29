function endOfTurn(){
    currentTurn = currentTurn == "red" ? "black" : "red";
    movingPawns = false;
    currentTurnNumber++;
    document.getElementById("firstRoll").value = document.getElementById("secondRoll").value = "";
    updateServer(currentBoard, gameID, currentTurnNumber, color);
}

function moveOutFromBoard(cellIndex){
    if(currentBoard[cellIndex].number == 0 || currentBoard[cellIndex].color != color || currentBoard[cellIndex].number == null)
        return;
    
    let selectedCell = cellIndex + 1;
    let column = document.getElementById("col"+selectedCell);
    let newPawn = document.createElement("div");
    newPawn.className = color;

    if(color == "red"){
        let distanceFromOut = 24 - cellIndex;
        let outerColumnRed = document.getElementById("red-container");

        if(distanceFromOut != rolls[0] && distanceFromOut != rolls[1] && distanceFromOut != (rolls[0] + rolls[1]))
            return;
        
        currentBoard[cellIndex].number--;
        if(currentBoard[cellIndex].number == 0){
            currentBoard[cellIndex].color = null;
        }

        if(distanceFromOut == rolls[0]){
            rolls[0] = 0;
        } else if(distanceFromOut == rolls[1]){
            rolls[1] = 0;
        } else {
            rolls[0] = rolls[1] = 0;
        }
        outRed++;
        column.removeChild(column.firstChild);
        outerColumnRed = document.getElementById("red-container");
        outerColumnRed.appendChild(newPawn)
        if(outRed == 15){
            endOfTurn();
            endgame();
        } else if((rolls[0] + rolls[1]) == 0 || !checkMovablePawn()){
            endOfTurn();
        }
    } else {
        if(selectedCell != rolls[0] && selectedCell != rolls[1] && selectedCell != (rolls[0] + rolls[1]))
            return;
        
        currentBoard[cellIndex].number--;
        if(currentBoard[cellIndex].number == 0){
            currentBoard[cellIndex].color = null;
        }

        if(selectedCell == rolls[0]){
            rolls[0] = 0;
        } else if(selectedCell == rolls[1]){
            rolls[1] = 0;
        } else {
            rolls[0] = rolls[1] = 0;
        }
        outBlack++;
        column.removeChild(column.firstChild);
        outerColumnBlack = document.getElementById("black-container");
        outerColumnBlack.appendChild(newPawn)
        if(outBlack == 15){
            endOfTurn();
            endgame();
        } else if((rolls[0] + rolls[1]) == 0 || !checkMovablePawn()){
            endOfTurn();
        }
    }
}


function moveSinglePawn(oldCell, newCell){
    console.log(oldCell, newCell);
    let end = false;

    if(oldCell == newCell){
        pawnSelected = !pawnSelected;
        return;
    }
    // Controllo vincoli sulle pedine nel caso di movimento del rosso (verso le colonne di indice maggiore)
    if(color == "red"){
        if(newCell != (oldCell + rolls[0]) && newCell != (oldCell + rolls[1]) && newCell != (oldCell + rolls[0] + rolls[1]))
            return;
    } else if(color == "black"){
        if(newCell != (oldCell - rolls[0]) && newCell != (oldCell - rolls[1]) && newCell != (oldCell - (rolls[0] + rolls[1])))
            return;
    }


    if(currentBoard[newCell-1].color != color && currentBoard[newCell-1].number > 1)
        return;


    console.log("Movimento legale");

    let newColumn = document.getElementById("col"+newCell);
    let oldColumn = document.getElementById("col"+oldCell);

    let newPawn = document.createElement("div");
    newPawn.className = color;

    // Colpisce la pedina dell'avversario
    if(currentBoard[newCell-1].color != color && currentBoard[newCell-1].number == 1){
        let dividerBottom = document.getElementById("divider-bottom");
        let dividerTop = document.getElementById("divider-top");
        let ownedPawnColor = (color == "red") ? "black" : "red";
        newColumn.innerHTML = "";
        let ownedPawn = document.createElement("div");
        ownedPawn.className = ownedPawnColor;
        if(ownedPawnColor == "red"){ // Ho mangiato una pedina rossa
            hasEatenRed = true;
            eatenRedNumber++;
            dividerBottom.appendChild(ownedPawn);
        } else {
            hasEatenBlack = true;
            eatenBlackNumber++;
            dividerTop.appendChild(ownedPawn);
        }
        currentBoard[newCell-1].number = 1;
    } else {
        currentBoard[newCell-1].number++;
    }

    oldColumn.removeChild(oldColumn.firstChild);
    newColumn.appendChild(newPawn);
    
    console.log("OldCell ", oldCell, "NewCell", newCell);

    currentBoard[oldCell-1].number--;
    currentBoard[newCell-1].color = color;
    if(currentBoard[oldCell-1].number <= 0)
        currentBoard[oldCell-1].color = null;
    
    pawnSelected = false;

    if(Math.abs(oldCell - newCell) == (rolls[0] + rolls[1])){
        rolls[0] = rolls[1] = 0;
        end = true;
    } else if(Math.abs(oldCell - newCell) == rolls[0]){
        rolls[0] = 0;
    } else if(Math.abs(oldCell - newCell) == rolls[1]){
        rolls[1] = 0;
    }
    if(end){
        endOfTurn();
    }
    allPawnsInHome = checkPawnInHome();
    if(allPawnsInHome)
        alert("All pawns in home")
}

function movePawnFromBase(cellIndex){
    console.log("Moving From base", currentBoard);
    let selectedCell = cellIndex + 1;
    let newColumn = document.getElementById("col"+selectedCell);
    let newPawn = document.createElement("div");
    newPawn.className = color;
    if(currentBoard[cellIndex].color != color && currentBoard[cellIndex].number > 1)
        return;
    
    if
    ( 
        currentBoard[cellIndex].color == color ||
        currentBoard[cellIndex].number == 0 || 
        currentBoard[cellIndex].number == null ||
        currentBoard[cellIndex].color == null    
    )
    {
        console.log("In movingFromBase, color and index ", color, cellIndex);
        console.log("Rolls: ", rolls);
        if(color == "red"){
            if(selectedCell != rolls[0] && selectedCell != rolls[1] && selectedCell != (rolls[1] + rolls[0]))
                return;
            
            if(selectedCell == rolls[0]){
                rolls[0] = 0;
            } else if (selectedCell == rolls[1]){
                rolls[1] = 0;
            } else {
                rolls[0] = rolls[1] = 0;
            }
            newColumn.appendChild(newPawn);
            let bottomDivider = document.getElementById("divider-bottom");
            bottomDivider.removeChild(bottomDivider.firstChild);
            eatenRedNumber--;
            if(eatenRedNumber <= 0){
                eatenRedNumber = 0;
                hasEatenRed = false;
                movingFromBase = false;
            }
        } else {
            console.log("In movingFromBase, color and index ", color, cellIndex);
            console.log("Rolls: ", rolls);
            let distanceFromBase = 24 - cellIndex;
            console.log("DistanceFromBase", distanceFromBase)
            if(distanceFromBase != rolls[0] && distanceFromBase != rolls[1] && distanceFromBase != (rolls[1] + rolls[0]))
                return;
            
            if(distanceFromBase == rolls[0]){
                rolls[0] = 0;
            } else if (distanceFromBase == rolls[1]){
                rolls[1] = 0;
            } else {
                rolls[0] = rolls[1] = 0;
            }
            newColumn.appendChild(newPawn);
            let topDivider = document.getElementById("divider-top");
            topDivider.removeChild(topDivider.firstChild);
            eatenBlackNumber--;
            if(eatenBlackNumber <= 0){
                eatenBlackNumber = 0;
                hasEatenBlack = false;
                movingFromBase = false;
            }
        }
    }
    
    if(currentBoard[cellIndex].number == 0 || currentBoard[cellIndex].number == null){
        currentBoard[cellIndex].number = 1;
        currentBoard[cellIndex].color = color;
    } else if(currentBoard[cellIndex].color == color){
        currentBoard[cellIndex].number++;
    } else if(currentBoard[cellIndex].color != color && currentBoard[cellIndex].color != null && currentBoard[cellIndex].number == 1){
        // Mangio mentre inserisco la pedina nella tabella
        currentBoard[cellIndex].color = color;
        currentBoard[cellIndex].number = 1;
        let eatenPawn = document.createElement("div");
        eatenPawn.className = (color == "red") ? "black" : "red";
        if(color == "red"){
            if(selectedCell != rolls[0] && selectedCell != rolls[1] && selectedCell != (rolls[1] + rolls[0]))
                return;
            
            if(selectedCell == rolls[0]){
                rolls[0] = 0;
            } else if (selectedCell == rolls[1]){
                rolls[1] = 0;
            } else {
                rolls[0] = rolls[1] = 0;
            }
            let topDivider = document.getElementById("divider-top");
            topDivider.appendChild(eatenPawn);
            let bottomDivider = document.getElementById("divider-bottom");
            bottomDivider.removeChild(bottomDivider.firstChild);
            eatenRedNumber--;
            if(eatenRedNumber <= 0){
                eatenRedNumber = 0;
                hasEatenRed = false;
                movingFromBase = false;
            }
            hasEatenBlack = true;
            eatenBlackNumber++;
        } else {
            let distanceFromBase = 24 - cellIndex;
            console.log("DistanceFromBase", distanceFromBase)
            if(distanceFromBase != rolls[0] && distanceFromBase != rolls[1] && distanceFromBase != (rolls[1] + rolls[0]))
                return;
            
            if(distanceFromBase == rolls[0]){
                rolls[0] = 0;
            } else if (distanceFromBase == rolls[1]){
                rolls[1] = 0;
            } else {
                rolls[0] = rolls[1] = 0;
            }
            let bottomDivider = document.getElementById("divider-bottom");
            bottomDivider.appendChild(eatenPawn);
            let topDivider = document.getElementById("divider-top");
            topDivider.removeChild(topDivider.firstChild);
            eatenBlackNumber--;
            if(eatenBlackNumber <= 0){
                eatenBlackNumber = 0;
                hasEatenBlack = false;
                movingFromBase = false;
            }
            hasEatenRed = true;
            eatenRedNumber++;
        }
        newColumn.innerHTML = "";
        newColumn.appendChild(newPawn);
    }

    console.log(currentBoard);

    if((rolls[0] + rolls[1]) == 0){
        endOfTurn();
    }
}

function movePawns(e){
    if(!movingPawns)
        return;

    let targetCell;

    if(e.target.className != "triangle-top" && e.target.className != "triangle-bottom" && e.target.className != "black" && e.target.className != "red")
        return;
    
    if(e.target.className == "red" || e.target.className == "black"){
        targetCell = e.target.parentElement;
    } else {
        targetCell = e.target;
    }
    console.log("Target cell: ", targetCell);

    let cellIndex = parseInt(targetCell.id.substring(3, targetCell.id.length)) - 1;
    console.log(cellIndex);
        
    if(movingFromBase){
        movePawnFromBase(cellIndex);
        return;
    }

    if(allPawnsInHome){
        if(!checkMovablePawn()){
            endOfTurn();
            return;
        } else {
            moveOutFromBoard(cellIndex);
            return;
        }
    }

    if(currentBoard[cellIndex].color != color && !pawnSelected)
        return;

    if(!pawnSelected && currentBoard[cellIndex].number == 0)
        return;

    if(!pawnSelected){
        selectedCell = cellIndex + 1;
        pawnSelected = true;
        console.log("Pawn selected");
        return;
    } else {
        moveSinglePawn(selectedCell, cellIndex + 1);
    }
}