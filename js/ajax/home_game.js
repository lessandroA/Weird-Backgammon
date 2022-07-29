/*
// Chiamata ajax che aggiorna la home qualora si voglia giocare una partita o farne partire un'altra

$(document).ready(function(){
    $('#new-game').click(function(){
        $('#container').load("php/newgame.php");
    });    
    
    $('#load-game').click(function(){
        $('#container').load("php/loadgame.php");
    })
    
    // Se l'avversario non esiste, non si può iniziare la partita
    
    $(document).on('click', '#new-game-button', function(e){
        e.preventDefault();
        console.log("Default preventato");
        $.get("php/checkopponent.php?user="+$('#input-new-opponent').val(), function (result) {
            console.log(result);
            console.log(result['rv']);
            result = JSON.parse(result);
            console.log(result);
            console.log(result['rv']);
            if(!result['rv']){
                alert("Opponent not found");
            } else {
                $(window.location).attr('href', 'php/board.php?id='+result['id']);
            }
        })
    });
    
    // carico l'ultima partita non finita con l'avversario specificato
    $(document).on('click', '#load-game-button', function(e){
        e.preventDefault();
        $.get("php/checkopponentloading.php?user="+$('#input-load-opponent').val(), function(result){
            console.log(result);
            result = JSON.parse(result); // parso il json arrivato dalla chiamata ajax
            if(!result['rv']){
                alert("Opponent not found");
            } else {
                $(window.location).attr('href', 'php/board.php?id='+result['id']);
            }
        });
    })
});

*/

function getNewGame(){
    fetch("newgame.php")
    .then(res => res.text())
    .then(data => {
        console.log(data);
        let container = document.getElementById("container");
        container.innerHTML = data;

        document.getElementById("new-game-button").addEventListener("click", function(e){
            e.preventDefault();
            let newOpponentInput = document.getElementById("input-new-opponent");
            fetch("checkopponent.php?user=" + newOpponentInput.value)
            .then(res => res.json())
            .then(data => {
                if(!data['rv']){
                    alert("Opponent not found");
                } else {
                    window.location.href = 'board.php?id='+data['id']
                }
            })
        });
    });
}

function loadGame(){
    fetch("loadgame.php")
    .then(res => res.text())
    .then(data => {
        console.log(data);
        let container = document.getElementById("container");
        container.innerHTML = data;
    
        document.getElementById("load-game-button").addEventListener("click", function(e){
            e.preventDefault();
            let loadOpponentInput = document.getElementById("input-load-opponent");
            fetch("checkopponentloading.php?user=" + loadOpponentInput.value)
            .then(res => res.json())
            .then(data => {
                if(!data['rv']){
                    alert("Opponent not found");
                } else {
                    window.location.href = 'board.php?id='+data['id']
                }
            })
        });
    });
}



function main(){
    let newGameButton = document.getElementById("new-game");
    let loadGameButton = document.getElementById("load-game");
    
    newGameButton.addEventListener("click", getNewGame);
    loadGameButton.addEventListener("click", loadGame);
}