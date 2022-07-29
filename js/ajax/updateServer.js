function updateServer(board,id,turn,turnColor){
    let tmp = board;
    let nextTurn = turnColor == "red" ? "black" : "red";
    
    let string = ""
    for(let i = 0; i < 24; i++){
        string += ("color" + (i + 1) + "=" + tmp[i].color + "&number" + (i + 1) + "=" + tmp[i].number + "&"); 
    }
    string += "id=" + id + "&turnNumber=" + turn + "&nextTurn=" + nextTurn;
    string += "&hasEatenBlack=" + hasEatenBlack + "&hasEatenRed=" + hasEatenRed + "&eatenBlackNumber=" + eatenBlackNumber + "&eatenRedNumber=" + eatenRedNumber;
    string += "&outRed=" + outRed + "&outBlack=" + outBlack;
    fetch("../php/boardUpdateAPI.php?" + string)
    .then(res => res.json())
    .then(data => {
        console.log("Board updated: ", data);
    });
}