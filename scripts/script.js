// Turns On the "Start New Game" Button

function initiateGameStartElem() {
  getGameStartElem().classList.add("clickable");
  getGameStartElem().addEventListener("click", startGame);
}

// Control Functions

function startGame() {
  clearRoundResult();
  
  getGameStartElem().hidden  = true;
  getGameResultElem().hidden = true;

  humanScore    = 0;
  computerScore = 0;
  updateScoreElements();

  startClickableChoices();
}

function endGame() {
  endClickableChoices();
  getGameStartElem().hidden = false;
}

function playRound(event) {
  event.stopPropagation();

  const humanChoice    = getHumanChoice(event);
  const computerChoice = getComputerChoice();
  const winner         = shoot(humanChoice, computerChoice);

  updateScore(winner);
  displayRoundResult(humanChoice, computerChoice, winner);

  if (isGameOver()) {
    displayGameResult(winner);
    endGame();
    return;
  }

  startPause();
}

// Game Functions

function getHumanChoice(event) {
  return event.target.title.toLowerCase();
}

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices.at(index);
}

function shoot(humanChoice, computerChoice) {
  if (
    humanChoice == "rock"     && computerChoice == "scissors" ||
    humanChoice == "paper"    && computerChoice == "rock"     ||
    humanChoice == "scissors" && computerChoice == "paper"
  ) {
    return "human";
  } else if (
    humanChoice == "rock"     && computerChoice == "paper"    ||
    humanChoice == "paper"    && computerChoice == "scissors" ||
    humanChoice == "scissors" && computerChoice == "rock"     
  ) {
    return "computer";
  } else if (
    humanChoice == computerChoice
  ) {
    return "draw";
  } else {
    throw new Error("What game are you playing?");
  };
}

// Game Scores

function resetScores() {
}

function updateScore(winner) {
  if (winner ==    "human") humanScore++;
  if (winner == "computer") computerScore++;
  updateScoreElements();
}

function updateScoreElements() {
  getScoreElem(   "human").textContent = humanScore;
  getScoreElem("computer").textContent = computerScore;
}

// Toggles

function displayRoundResult(humanChoice, computerChoice, winner) {
  if (isPlayer(winner)) getPlayerElem(winner).classList.add("scored");
  getChoiceElem(  "human",     humanChoice).classList.add("clicked");
  getChoiceElem("computer", computerChoice).classList.add("clicked");
}

function clearRoundResult() {
  for (player of ["human", "computer"]) {
    getPlayerElem(player).classList.remove("scored");
    for (choice of choices) {
      getChoiceElem(player, choice).classList.remove("clicked");
    };
  };
}

function displayGameResult(winner) {
  getGameResultElem().textContent = winnerAnnouncement(winner);
  getGameResultElem().hidden      = false;
}

function winnerAnnouncement(winner) {
  return `${capitalize(winner)} Wins!`;
}

function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

// Booleans

function isPlayer(player) {
  return player == "human" || player == "computer";
}

function isGameOver() {
  return humanScore == winningScore || computerScore == winningScore;
}

// Change DOM Elements

function startClickableChoices() {
  for (choice of choices) {
    const choiceElem = getChoiceElem("human", choice);
    choiceElem.addEventListener("click", playRound);
    choiceElem.classList.add("clickable");
  };
}

function endClickableChoices() {
  for (choice of choices) {
    const choiceElem = getChoiceElem("human", choice);
    choiceElem.removeEventListener("click", playRound);
    choiceElem.classList.remove("clickable");
  };
}

function startPause() {
  endClickableChoices();
  getBodyElem().addEventListener("click", endPause);
}

function endPause() {
  clearRoundResult();
  getBodyElem().removeEventListener("click", endPause);
  startClickableChoices();
}

// Get DOM Elements

function getBodyElem() {
  return document.querySelector("body");
}

function getPlayerElem(player) {
  return document.querySelector(`.${player}`);
}

function getScoreElem(player) {
  return getPlayerElem(player).querySelector(".score");
}

function getChoiceElem(player, choice) {
  return getPlayerElem(player).querySelector(`.choices .${choice}`);
}

function getGameResultElem() {
  return document.getElementById("game-result");
}

function getGameStartElem() {
  return document.getElementById("game-start");
}

const choices      = ["rock", "paper", "scissors"];
const winningScore = 5;

let humanScore     = 0;
let computerScore  = 0;

initiateGameStartElem();
