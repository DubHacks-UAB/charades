const team1button = document.querySelector("#team1Button");
const team2button = document.querySelector("#team2Button");

const team1score = document.querySelector("#team1Score");
const team2score = document.querySelector("#team2Score");
const reset = document.querySelector("#reset")
let team1 = 0;
let team2= 0;

team1button.addEventListener('click',function(){
    team1 += 1;
    team1score.textContent = team1;
})

team2button.addEventListener('click',function(){
    team2 += 1;
    team2score.textContent = team2;
})

reset.addEventListener('click', function(){
    team1score.textContent = 0;
    team2score.textContent = 0;

})