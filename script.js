// Function to get the computer's choice will randomly return one of three
// strings: "rock", "paper", "scissors"

function getComputerChoice() {
  switch (Math.floor(Math.random() * 3 + 1)) {
  case 1:
    return "rock";
    break;
  case 2:
    return "paper";
    break;
  case 3:
    return "scissors";
    break;
  };
}

// Function to get user's choice.

function getHumanChoice() {
  let humanChoice = prompt("(R)ock, (P)aper, or (S)cissors?");

  switch (humanChoice.toLowerCase()) {
    case "r":
    case "rock":
      return "rock";
      break;
    case "p":
    case "paper":
      return "paper";
      break;
      case "s":
    case "scissors":
      return "scissors";
      break;
    default:
      // TO-DO: What happens when user types something else?
  }
}

// Function to play a round of rock, paper, scissors

function playRound(humanChoice, computerChoice) {
  console.log("You play " + humanChoice);
  console.log("Computer plays " + computerChoice);
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
};


// Variables to keep track of scores

let humanScore = 0;
let computerScore = 0;

let humanSelection = getHumanChoice();
let computerSelection = getComputerChoice();

console.log(playRound(humanSelection, computerSelection));

console.log("You " + humanScore + ", Computer " + computerScore);