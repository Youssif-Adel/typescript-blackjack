export interface Card {
  name: string;
  type: Suits;
  value: number;
}

export type Deck = Card[];

export enum FaceCards {
  King = "K",
  Queen = "Q",
  Jack = "J",
  Ace = "A",
}

// clubs (♣), diamonds (♦), hearts (♥) and spades (♠)
export enum Suits {
  Clubs = "♣",
  Diamonds = "♦",
  Heart = "♥",
  Spades = "♠",
}
