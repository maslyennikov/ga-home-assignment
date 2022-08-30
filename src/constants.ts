import { Currency } from "./types";

export const GAMES_URL = "/api/gamesData";
export const RATES_URL = "/api/rates";

export const ratesInitialState: Record<Currency, number> = {
  [Currency.GBP]: 1,
  [Currency.EUR]: 1,
  [Currency.USD]: 1,
};
