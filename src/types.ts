export interface Game {
  id: string;
  artworkUrl: string;
  name: string;
  price: number;
  rating: number;
  releaseDate: string;
  tags: Array<string>;
}

export interface CartGame extends Game {
  quantity: number;
}

export interface PageGame extends Game {
  quantity: {
    checkoutQuantity: number;
    listQuantity: number;
  };
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}
