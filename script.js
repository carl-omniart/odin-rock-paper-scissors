function playGame() {

  // Get computer choice
  // Randomly return one of three strings: "rock", "paper", or "scissors"
  function getComputerChoice() {
    switch (Math.floor(Math.random() * 3 + 1)) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
      return "scissors";
    };
  }

  // Prompt human for choice of "rock", "paper", or "scissors"
  // Allow uppercase, lowercase, or a mixture response
  // Allow single character response: "r", "p", or "s"
  // Throw error if user choice is not one of these
  function getHumanChoice() {
    let humanChoice = prompt("(R)ock, (P)aper, or (S)cissors?");

    switch (humanChoice.toLowerCase()) {
      case "r":
      case "rock":
        return "rock";
      case "p":
      case "paper":
        return "paper";
      case "s":
      case "scissors":
        return "scissors";
      default:
        throw new TypeError("Not rock, paper, or scissors");
    };
  }

  // Compare human and computer choices, return result
  // Result is from human perspective: "win", "lose", or "draw"
  function compareChoices(humanChoice, computerChoice) {
    if (
      humanChoice == "rock"     && computerChoice == "scissors" ||
      humanChoice == "paper"    && computerChoice == "rock"     ||
      humanChoice == "scissors" && computerChoice == "paper"
    ) {
      return "win"
    } else if (
      humanChoice == "rock"     && computerChoice == "paper"    ||
      humanChoice == "paper"    && computerChoice == "scissors" ||
      humanChoice == "scissors" && computerChoice == "rock"     
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
      humanScore++;
    } else if (result == "lose") {
      computerScore++
    };

    return `${humanScore}-${computerScore}`;
  }

  // Play round
  function playRound() {

    // Get and log choices
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    console.log(`${humanSelection} vs. ${computerSelection}`);

    // Compare choices and log result
    const result = compareChoices(humanSelection, computerSelection);
    console.log(result);

    // Update and log scores
    const scoreline = updateScores(result);
    console.log(`Score: ${scoreline}`);
  };

  // Initiate score variables
  let humanScore = 0;
  let computerScore = 0;

  // Play five rounds
  for (let round = 1; round <= 5; round++) {

    // Log round number
    console.log(`Round ${round}`);

    // Play round
    playRound();
  };
}

playGame();