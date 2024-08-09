// function playGame

function playGame() {

  // Function to get the computer's choice.
  // Will randomly return one of three strings: "rock", "paper", "scissors"

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

  // Function to prompt user for choice.
  // Throws error if user's input is not rock, paper, or scissors.

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

  // Function to play a round of rock, paper, scissors.
  // First checks if there is a tie, if not compares plays.
  // Returns result in form of a string message.

  function playRound(humanChoice, computerChoice) {
    if (humanChoice == computerChoice) {
      return "Tie!";
    };

    switch (humanChoice) {
      case "rock":
        if (computerChoice == "scissors") {
          humanScore++
          return "Rock blunts scissors. You win!";
        } else if (computerChoice == "paper") {
          computerScore++
          return "Paper wraps rock. Computer wins!";
        };
      case "paper":
        if (computerChoice == "rock") {
          humanScore++
          return "Paper wraps rock. You win!";
        } else if (computerChoice == "scissors") {
          computerScore++
          return "Scissors cut paper. Computer wins!";
        };
      case "scissors":
        if (computerChoice == "paper") {
          humanScore++
          return "Scissors cut paper. You win!";
        } else if (computerChoice == "rock") {
          computerScore++
          return "Rock blunts scissors. Computer wins!";
        };
    };
  }

  // Initiate score variables

  let humanScore = 0;
  let computerScore = 0;

  // Play five rounds per game
  // Logs plays, results, and score

  for (let round = 1; round <= 5; round++) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();

    console.log(`You play ${humanSelection}`);
    console.log(`Computer plays ${computerSelection}`);

    const result = playRound(humanSelection, computerSelection);

    console.log(result);
    console.log(`You ${humanScore}, Computer ${computerScore}`);
  };
}

playGame();