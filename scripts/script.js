// ===== Game =====

class Game {
  constructor(winningScore = 5) {
    this.winningScore = winningScore;
    this.rounds       = [];
  }

  get lastRound() {
    return this.rounds[this.rounds.length - 1];
  }

  get winner() {
    if (this.score(   "human") == this.winningScore) return "human";
    if (this.score("computer") == this.winningScore) return "computer";
    return null;
  }

  score(player) {
    return this.#count(this.rounds, (round) => round.winner == player);
  }

  isOver() {
    return Boolean(this.winner);
  }

  playRound(choice) {
    if (this.isOver()) return;
    const round = new Round(choice);
    this.rounds.push(round);
    return round;
  }

  #count(array, condition) {
    return array.filter(condition).length;
  }
}

class Round {
  constructor(humanChoice) {
    this.human    = humanChoice;
    this.computer = this.#pickOne(["rock", "paper", "scissors"]);
    this.winner   = this.#shoot();
  }

  hasWinner() {
    return this.winner != "draw";
  }

  #pickOne(array) {
    const index = Math.floor(Math.random() * array.length);
    return array.at(index);
  }
  
  #shoot() {
    if (
      this.human == "rock"     && this.computer == "scissors" ||
      this.human == "paper"    && this.computer == "rock"     ||
      this.human == "scissors" && this.computer == "paper"
    ) {
      return "human";
    } else if (
      this.human == "rock"     && this.computer == "paper"    ||
      this.human == "paper"    && this.computer == "scissors" ||
      this.human == "scissors" && this.computer == "rock"     
    ) {
      return "computer";
    } else if (
      this.human == this.computer
    ) {
      return "draw";
    } else {
      throw new Error("What game are you playing?");
    };
  } 
}

// ==== Model =====

class Model {
  constructor() {
    this.game = null;
  }

  newGame(winningScore) {
    this.game = new Game;
    return this.game;
  }
}

// ===== View =====

class View {
  constructor(doc) {
    this.doc        = doc
    this.body       = this.doc.querySelector("body");
    this.gameResult = this.doc.getElementById("game-result"); 
    this.gameStart  = this.doc.getElementById("game-start");
  }

  playerBox(player) {
    return this.doc.getElementById(player);
  }

  scorebox(player) {
    return this.playerBox(player).querySelector(".scorebox");
  }

  score(player) {
    return this.playerBox(player).querySelector(".score");
  }

  name(player) {
    return this.playerBox(player).querySelector(".name");
  }

  choiceBox(player) {
    return this.playerBox(player).querySelector(".choices");
  }

  choices(player) {
    return this.choiceBox(player).querySelectorAll(":scope > *");
  }

  choice(player, item) {
    return this.choiceBox(player).querySelector(`.${item}`);
  }

  startGameStartButton() {
    this.gameStart.classList.add("clickable");
    this.gameStart.hidden = false;
  }

  stopGameStartButton() {
    this.gameStart.classList.remove("clickable");
    this.gameStart.hidden = true;
  }

  startChoosing(player) {
    this.choices(player).forEach((c) => c.classList.add("clickable"));
  }

  stopChoosing(player) {
    this.choices(player).forEach((c) => c.classList.remove("clickable"));
  }

  showRoundResult(round) {
    this.choice(   "human",    round.human).classList.add("clicked");
    this.choice("computer", round.computer).classList.add("clicked");
    if (round.hasWinner()) {
      this.scorebox(round.winner).classList.add("scored");
    };
  }

  clearRoundResult(round) {
    this.choice(   "human",    round.human).classList.remove("clicked");
    this.choice("computer", round.computer).classList.remove("clicked");
    if (round.hasWinner()) {
      this.scorebox(round.winner).classList.remove("scored");
    };
  }

  showGameResult(game) {
    this.gameResult.textContent = this.#winnerAnnouncement(game.winner);
    this.gameResult.hidden      = false;
  }

  clearGameResult(game) {
    this.gameResult.textContent = "";
    this.gameResult.hidden      = true;
  }

  updateName(player, name) {
    this.name(player).textContent = name;
  }

  updateScore(player, score) {
    this.score(player).textContent = score;
  }

  #winnerAnnouncement(winner) {
    return `${this.#capitalize(winner)} Wins!`;
  }
  
  #capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
  }
}

// ====== Controller =====

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view  = view;
    this.name  = "CONTROLLER";
  }

  // TO FIGURE OUT: PASSING THIS IN AN EVENT LISTENER

  startGameStartButton() {
    this.view.gameStart.addEventListener("click", startGame);
    this.view.startGameStartButton();
  }

  stopGameStartButton() {
    this.view.gameStart.removeEventListener("click", startGame);
    this.view.stopGameStartButton();
  }

  startHumanChoosing() {
    this.view.choices("human").forEach(
      (c) => c.addEventListener("click", choose)
    );
    this.view.startChoosing("human");
  }

  stopHumanChoosing() {
    this.view.choices("human").forEach(
      (c) => c.removeEventListener("click", choose)
    );
    this.view.stopChoosing("human");
  }

  startNewGame() {
    const game = model.newGame();
    view.updateScore(   "human", game.score("human"));
    view.updateScore("computer", game.score("computer"));
  }

  clearPreviousRound() {
    view.clearRoundResult(this.model.game.lastRound);
  }

  clearPreviousGame() {
    const game = this.model.game;
    if (!game) return;
    view.clearRoundResult(game.lastRound);
    view.clearGameResult(game);
  }
}

// =====

function startGame() {
  controller.stopGameStartButton();
  controller.clearPreviousGame();
  controller.startNewGame();
  controller.startHumanChoosing();
}

function stopGame() {
  controller.stopHumanChoosing();
  controller.startGameStartButton();
}

function startClickToContinue() {
  console.log("Start Click to Continue");
  controller.stopHumanChoosing();
  view.body.addEventListener("click", stopClickToContinue);
}

function stopClickToContinue() {
  console.log("Stop Click to Continue");
  view.body.removeEventListener("click", stopClickToContinue);
  controller.clearPreviousRound();
  controller.startHumanChoosing();
}

function choose(event) {
  event.stopPropagation();

  const choice = event.target.title.toLowerCase();
  const game   = model.game;
  const round  = game.playRound(choice)

  console.log(["Round Winner & Flag", round.winner, round.hasWinner()]);
  
  if (round.hasWinner()) view.updateScore(round.winner, game.score(round.winner));
  view.showRoundResult(round);

  if (game.isOver()) {
    console.log("choose: game is over");
    view.showGameResult(game);
    stopGame();
  } else {
    console.log("choose: game is not over");
    startClickToContinue();
  }; 
}


//

const view       = new View(document);
const model      = new Model;
const controller = new Controller(model, view);

controller.startGameStartButton();
