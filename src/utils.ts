import { Deck, Card, FaceCards, Suits } from "./types";
import { deck, userHand, dealerHand } from "./variables";

export function createDeck(): Deck {
  const deck: Deck = [];

  for (const suit of Object.values(Suits)) {
    for (let i = 2; i <= 10; i++) {
      const card: Card = {
        type: suit,
        value: i,
        name: `${suit}${i}`,
      };

      deck.push(card);
    }

    for (const faceCard of Object.values(FaceCards)) {
      const card: Card = {
        type: suit,
        value: 10,
        name: `${suit}${faceCard}`,
      };

      deck.push(card);
    }
  }

  return deck;
}

export function shuffleDeck(deck: Deck): Deck {
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * deck.length);

    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function drawCard(hand: Deck): Deck {
  hand.push(deck.pop() as Card);
  return deck;
}

export function displayHands() {
  console.log(
    "Dealer: " +
      dealerHand.map((value) => value.name).join(", ") +
      " (Total: " +
      calcTotal(dealerHand) +
      ")",
  );

  console.log(
    "You: " +
      userHand.map((value) => value.name).join(", ") +
      " (Total: " +
      calcTotal(userHand) +
      ")",
  );
}

export function calcTotal(deck: Deck) {
  return deck.reduce(
    (previousValue, currentValue) => previousValue + currentValue.value,
    0,
  );
}
