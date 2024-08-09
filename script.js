// Function to get the computer's choice will randomly return one of three
// strings: "rock", "paper", "scissors"

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

// Function to get user's choice.

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
      // TO-DO: What happens when user types something else?
  }
}

console.log(getComputerChoice());
console.log(getHumanChoice());