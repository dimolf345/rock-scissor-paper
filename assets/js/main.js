let playerChoice = document.getElementById('playerChoice');
let bunttonContainer = document.getElementsByClassName('button-container');
let gameMatch = document.getElementById('gameMatch');
let winLose = document.getElementById('winLose');
let playAgain = document.getElementById('playAgain');
let scoreValue= localStorage.getItem('score');
let scoreEl = document.getElementById('score');

const choices = {
    "scissor" : ["paper", "lizard"],
    "paper": ["rock", "spock"],
    "lizard" : ["spock", "paper"] ,
    "spock" : ["scissor", "rock"] ,
    "rock": ["lizard","scissor"]
}
playerChoice.addEventListener('click', function(e) {
    if(e.target.tagName ==='BUTTON') {
        startRound(e.target);
    }
})

playAgain.addEventListener('click',function() {
    clearGame();
});

function startRound(userChoice) {
    let picked = pickButton(userChoice);
    let computerChoice = selectComputerChoice();
    appendComputerChoice(computerChoice);
    let userWins = winOrLose(picked,computerChoice);
    showWinner(userWins);
    updateScore(userWins);
}

function pickButton(button) {
    let buttonChosed = button.cloneNode();
    playerChoice.append(buttonChosed);
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

function winOrLose(picked,computerChoice) {
    if (picked===computerChoice) {
        return;
    }
    return (choices[picked].includes(computerChoice));
}

function showWinner(userWins) {
    let h1 = winLose.getElementsByTagName('h1')[0];
    h1.textContent = userWins? "You win" : 
    (typeof(userWins)==='undefined')? "It's a draw" : "You lose";
    winLose.style.display = "block";
}

function clearGame() {
    winLose.style.display = "none";
    gameMatch.style.display = "none";
    playerChoice.style.display = "block";
}

function updateScore(win) {
    if (win===undefined) {
        return;
    }
    let newScore = parseInt(scoreValue);
    (win)? newScore++ : newScore--;
    scoreEl.textContent = newScore;
    scoreValue = newScore;
    localStorage.setItem('score', scoreValue.toString());
}


function setFirstScore() {
    if (!scoreValue) {
    scoreValue= 10;
    localStorage.setItem("score", scoreValue.toString());
    } else {
        scoreValue = parseInt(localStorage.getItem('score'));
    }
}

setFirstScore();
scoreEl.textContent=scoreValue.toString();