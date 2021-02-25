let playerChoice = document.getElementById('playerChoice');
let bunttonContainer = document.getElementsByClassName('button-container');
let gameMatch = document.getElementById('gameMatch');

const choices = {
    "scissor" : ["paper", "lizard"],
    "paper": ["rock", "spock"],
    "lizard" : ["spock", "paper"] ,
    "spock" : ["scissor", "rock"] ,
    "rock": ["lizard","scissor"]
}

playerChoice.addEventListener('click', function(e) {
 startRound(e.target)
})

function startRound(userChoice) {
    let picked = pickButton(userChoice);
    let computerChoice = selectComputerChoice();
    appendComputerChoice(computerChoice);
    winOrLose(player,computer);
    updateScore();


}

function pickButton(button) {
    let buttonChosed = button;
    playerChoice.appendChild(buttonChosed);
    playerChoice.style.display = "none";
    gameMatch.style.display = "flex";
    bunttonContainer[0].append(buttonChosed);
    return button.dataset.game;
}

function selectComputerChoice() {
    let randomNum = Math.floor(Math.random() *5);
    return Object.keys(choices)[randomNum];
}

function appendComputerChoice(computerChoice) {
    let button = document.createElement('button');
    button.className = "game-btn " + computerChoice;
    bunttonContainer[1].innerHTML = '';
    bunttonContainer[1].appendChild(button); 
}