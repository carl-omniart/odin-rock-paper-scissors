function playGame() {
  function playRound(event) {
    const playerChoice = getPlayerChoice(event);
    playerChoiceSpan.textContent = playerChoice;

    const computerChoice = getComputerChoice();
    computerChoiceSpan.textContent = computerChoice;

    const result = compareChoices(playerChoice, computerChoice);
    resultSpan.textContent = result;

    updateScores(result);
    playerScoreSpan.textContent = playerScore;
    computerScoreSpan.textContent = computerScore;

    if (playerScore == 5) {
      announceWinner("Player");
    } else if (computerScore == 5) {
      announceWinner("Computer");
    };
  }

  // Returns text of pressed button
  function getPlayerChoice(event) {
    return event.target.textContent;
  }

  // Randomly returns "rock", "paper", or "scissors"
  function getComputerChoice() {
    switch (Math.floor(Math.random() * 3 + 1)) {
    case 1:
      return "Rock";
    case 2:
      return "Paper";
    case 3:
      return "Scissors";
    };
  }

  // Compare human and computer choices, return result
  // Result is from human perspective: "win", "lose", or "draw"
  function compareChoices(playerChoice, computerChoice) {
    playerChoice = playerChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (
      playerChoice == "rock"     && computerChoice == "scissors" ||
      playerChoice == "paper"    && computerChoice == "rock"     ||
      playerChoice == "scissors" && computerChoice == "paper"
    ) {
      return "win"
    } else if (
      playerChoice == "rock"     && computerChoice == "paper"    ||
      playerChoice == "paper"    && computerChoice == "scissors" ||
      playerChoice == "scissors" && computerChoice == "rock"     
    ) {
      return "lose"
    } else {
      return "draw"
    };
  }

  // Use result ("win", "lose", "draw") to update scores
  // Return string with updated scoreline
  function updateScores(result) {
    if (result == "win") {
      playerScore++;
    } else if (result == "lose") {
      computerScore++
    };
  }

  function announceWinner(winner) {
    paragraph = document.createElement("p")
    paragraph.textContent = `${winner} wins!`
    results.appendChild(paragraph);
  };

  // Initiate score variables
  let playerScore = 0;
  let computerScore = 0;

  const results            = document.getElementById("results");
  const playerChoiceSpan   = document.querySelector("#choices .player span");
  const computerChoiceSpan = document.querySelector("#choices .computer span");
  const resultSpan         = document.querySelector("#result span");
  const playerScoreSpan    = document.querySelector("#scores .player span");
  const computerScoreSpan  = document.querySelector("#scores .computer span");

  const buttons = document.querySelectorAll("#choices > button");
  buttons.forEach((button) => button.addEventListener("click", playRound));
}

playGame();