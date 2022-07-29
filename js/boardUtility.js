function switchTurn(){
    let input1 = document.getElementById("firstRoll").value;
    let input2 = document.getElementById("secondRoll").value;
    if(input1 == "" && input2 == "")
        document.getElementById("diceRolling").disabled = false;
}

function diceRoll(){
    rolls[0] = Math.floor(Math.random() * 6 + 1);
    rolls[1] =  Math.floor(Math.random() * 6 + 1);
    console.log(rolls)

    document.getElementById("firstRoll").value = rolls[0];
    document.getElementById("secondRoll").value = rolls[1];
    movingPawns = true;
    document.getElementById("diceRolling").disabled = true;    
}

function checkPawnInHome(){
    let pawnsInBase = 0;
    if(color == "black"){
        pawnsInBase = outBlack;
        for(let i = 0; i < 6; i++){
            if(currentBoard[i].color == "black")
                pawnsInBase += currentBoard[i].number;
        }
    }else{
        pawnsInBase = outRed;
        for(let i = 0; i < 6; i++){
            if(currentBoard[23-i].color == "red")
                pawnsInBase += currentBoard[23-i].number;
        }
    }
    console.log(pawnsInBase);
    return pawnsInBase >= 15;
}

function checkMovablePawn(){
    let res = false;
    console.log(color);
    if(color == "red"){
        if(rolls[0] != 0 && currentBoard[24-rolls[0]].number > 0)
            res = true;
        else if (rolls[1] != 0 && currentBoard[24-rolls[1]].number > 0)
            res = true;
        else if ((rolls[1] + rolls[0]) > 0 && currentBoard[24-rolls[0]-rolls[1]].number > 0)
            res = true;
    } else {
        
        if(rolls[0] != 0 && currentBoard[rolls[0]-1].number > 0)
            res = true;
        else if (rolls[1] != 0 && currentBoard[rolls[1]-1].number > 0)
            res = true;
        else if ((rolls[1] + rolls[0]) > 0 && currentBoard[rolls[0]+rolls[1]-1].number > 0)
            res = true;
    }
    console.log("CheckMovablePawn = ", res);
    return res;
}