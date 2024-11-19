import promptSync from "prompt-sync";
import { calcTotal, displayHands, drawCard } from "./utils";
import {
  dealerHand,
  userHand,
  running,
  turnOff,
  money,
  displayMoney,
  setMoney,
  resetGame,
} from "./variables";

const prompt = promptSync();

function startRound() {
  resetGame();
  const bet = takeBet();

  drawCard(dealerHand);
  drawCard(dealerHand);
  drawCard(userHand);

  displayHands();
  takeAction();
  dealerPlay();

  calcWinner(bet);
}

startRound();

function takeBet() {
  displayMoney();
  let bet: string;
  bet = prompt("Please enter a bet: ");

  while (parseInt(bet, 10) > money || isNaN(Number(bet))) {
    displayMoney();
    bet = prompt("Please enter a valid bet: ");
  }

  return parseInt(bet, 10);
}

function takeAction() {
  const choice = prompt("Hit or stand? ");

  if (choice.toLowerCase() === "hit") {
    drawCard(userHand);
    displayHands();
    if (calcTotal(userHand) >= 21) return;
    takeAction();
  } else {
    return;
  }
}

function dealerPlay() {
  while (calcTotal(dealerHand) < 17) {
    drawCard(dealerHand);
    displayHands();
  }
}

function calcWinner(bet: number) {
  if (calcTotal(userHand) > 21) {
    console.log(`You lose $${bet}.`);
    setMoney(money - bet);
  } else if (calcTotal(userHand) === 21) {
    console.log(`You win $${bet * (3 / 2)}`);
    setMoney(money + bet * (3 / 2));
  } else if (calcTotal(dealerHand) > 21) {
    console.log(`You win $${bet}`);
    setMoney(money + bet);
  } else if (calcTotal(dealerHand) > calcTotal(userHand)) {
    console.log(`You lose $${bet}.`);
    setMoney(money - bet);
  } else if (calcTotal(dealerHand) < calcTotal(userHand)) {
    console.log(`You win $${bet}`);
    setMoney(money + bet);
  } else {
    console.log("It's a draw, No winners");
  }
  displayMoney();

  playAgain();
}

function playAgain() {
  if (money <= 0) {
    console.log("Not enough money to start a new game");
    return;
  }
  const choice = prompt("Would you like to play again? Y/N \n");
  if (choice.toLowerCase() === "y") {
    startRound();
  } else {
    console.log("Thanks for playing!");
  }
}
