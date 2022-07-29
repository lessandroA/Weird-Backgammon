function begin(){
    let firstPsw = document.getElementById("firstPsw");
    let secondPsw = document.getElementById("secondPsw");
    secondPsw.oninput = changeColor;
    firstPsw.oninput = changeColor;

}

function changeColor(){
    let btn = document.getElementById("signup-button")
    if(firstPsw.value != secondPsw.value){
        secondPsw.style.backgroundColor = '#ffc2b3';
        secondPsw.style.borderColor = 'red';
        btn.disabled = true;
    } else {
        secondPsw.style.backgroundColor = firstPsw.style.backgroundColor;
        secondPsw.style.borderColor = firstPsw.style.borderColor;
        btn.disabled = false;
    }
}