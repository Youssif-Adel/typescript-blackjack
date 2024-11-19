import { Deck } from "./types";
import { createDeck, shuffleDeck } from "./utils";

export let running = true;

export let money = 100;

export let userHand: Deck = [];
export let dealerHand: Deck = [];

export let deck = createDeck();
deck = shuffleDeck(deck);

export function turnOff() {
  running = false;
}

export function displayMoney() {
  console.log("You have: $" + money);
}

export function setMoney(m: number) {
  money = m;
}
