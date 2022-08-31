import { Currency } from "./types";

export const GAMES_URL = "/api/gamesData";
export const RATES_URL = "/api/rates";

export const ratesInitialState: Record<Currency, number> = {
  [Currency.USD]: 1,
  [Currency.EUR]: 1,
  [Currency.GBP]: 1,
};

export const CurrencySymbol: Record<Currency, string> = {
  [Currency.USD]: "$",
  [Currency.EUR]: "€",
  [Currency.GBP]: "£",
};
