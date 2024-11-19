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
} from "./variables";

const prompt = promptSync();

function startRound() {
  const bet = takeBet();
  drawCard(dealerHand);
  drawCard(dealerHand);
  drawCard(userHand);
  displayHands();
  takeAction();
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
