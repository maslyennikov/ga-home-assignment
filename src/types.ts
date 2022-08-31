export interface Game {
  artworkUrl: string;
  name: string;
  price: number;
  rating: number;
  releaseDate: string;
  tags: Array<string>;
  quantity: number;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum Status {
  IDLE = "IDLE",
  FETCHING = "FETCHING",
  FETCHED = "FETCHED",
  ERROR = "ERROR",
}
