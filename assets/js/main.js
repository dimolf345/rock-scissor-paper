let playerChoice = document.getElementById('playerChoice');
let buttonContainer = document.getElementsByClassName('button-container');
let gameMatch = document.getElementById('gameMatch');
let winLose = document.getElementById('winLose');
let playAgain = document.getElementById('playAgain');
let scoreValue= localStorage.getItem('score');
let scoreEl = document.getElementById('score');


//blank button is used for winning animation keyframe with CSS since
//the effect is based on box-shadow property. If set to the chosed
//.game-btn node it will override the box-shadow;
let blankButton = '<button class="game-btn blank"></button>';

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

/*Start round does all the game*/ 
function startRound(userChoice) {
    let picked = pickButton(userChoice);
    let computerChoice = selectComputerChoice();
    const timeout = setTimeout(function() {
        appendComputerChoice(computerChoice);
        let userWins = winOrLose(picked,computerChoice);
        showWinner(userWins);
        updateScore(userWins);
    }, 800);

}

/*Pick button function copies the node selected by user
in the gameMatch div and sets the playerChoice div display 
property to none*/ 
function pickButton(button) {
    let buttonChosed = button.cloneNode();
    playerChoice.append(buttonChosed);
    playerChoice.style.display = "none";
    gameMatch.style.display = "flex";
    buttonContainer[0].append(buttonChosed);
    return button.dataset.game;
}

function selectComputerChoice() {
    let randomNum = Math.floor(Math.random() *5);
    return Object.keys(choices)[randomNum];
}

/*Creates a new button for the computer choice*/
function appendComputerChoice(computerChoice) {
    let button = document.createElement('button');
    button.className = "game-btn " + computerChoice;
    buttonContainer[1].appendChild(button); 


}

/*If there is a draw it return undefined*/
function winOrLose(picked,computerChoice) {
    if (picked===computerChoice) {
        return;
    }
    return (choices[picked].includes(computerChoice));
}

/*Show winner add the h1 and select the winning animation to the 
correct .button-container div*/ 

function showWinner(userWins) {
    let h1 = winLose.getElementsByTagName('h1')[0];
    if (userWins !== undefined) {
        let index = userWins? 0 : 1;
        let button= buttonContainer[index].getElementsByTagName('button')[0];
        button.className += ' winning';
    }
    h1.textContent = userWins? "You win" : 
    (typeof(userWins)==='undefined')? "It's a draw" : "You lose";
    winLose.style.display = "flex";
}

function clearGame() {
    winLose.style.display = "none";
    gameMatch.style.display = "none";
    playerChoice.style.display = "block";
    clearButtons();
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

function clearButtons() {
    buttonContainer[0].innerHTML = blankButton;
    buttonContainer[1].innerHTML = blankButton;
}



setFirstScore();
scoreEl.textContent=scoreValue.toString();

