import React, { useCallback, useContext, useEffect, useState } from "react";

import { Currency, Game, Status } from "../types";
import { GAMES_URL, RATES_URL, ratesInitialState } from "../constants";

type GamesContextState = {
  games: Record<string, Game>;
  rates: Record<Currency, number>;
  activeCurrency: Currency;
  status: Status;

  setActiveCurrency: (currency: Currency) => void;
  changeListQuantity: (gameId: string, quantity: number) => void;
};
type GameContextProviderProps = {
  children: React.ReactNode;
};

const initialGameContext: GamesContextState = {
  games: {},
  activeCurrency: Currency.USD,
  rates: ratesInitialState,
  status: Status.IDLE,
  setActiveCurrency: () => null,
  changeListQuantity: () => null,
};

const GamesContext = React.createContext<GamesContextState>(initialGameContext);

export const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const [activeCurrency, setActiveCurrency] = useState<Currency>(Currency.USD);
  const [games, setGames] = useState<Record<string, Game>>({});
  const [rates, setRates] = useState<Record<Currency, number>>(
    ratesInitialState
  );

  useEffect(() => {
    const fetchData = async () => {
      setStatus(Status.FETCHING);
      const [gamesResponse, ratesResponse] = await Promise.all([
        fetch(GAMES_URL),
        fetch(RATES_URL),
      ]);

      const ratesData = await ratesResponse.json();
      const gamesData = await gamesResponse.json();

      const formattedData: Record<string, Game> = gamesData.games.reduce(
        (acc: Record<string, Game>, game: Game & { id: string }) => ({
          [game.id]: {
            artworkUrl: game.artworkUrl,
            name: game.name,
            price: game.price,
            rating: game.rating,
            releaseDate: game.releaseDate,
            tags: game.tags,
            quantity: 1,
          },
          ...acc,
        }),
        {}
      );
      setGames(formattedData);
      setRates(ratesData);
      setStatus(Status.FETCHED);
    };

    fetchData().catch((error) => {
      setStatus(Status.ERROR);
      throw new Error(error);
    });
  }, []);

  const changeListQuantity = useCallback(
    (gameId: string, quantity: number) => {
      const updatedPageGames = {
        ...games,
        [gameId]: { ...games[gameId], quantity },
      };

      if (updatedPageGames) {
        setGames(updatedPageGames);
      }
    },
    [games]
  );

  return (
    <GamesContext.Provider
      value={{
        games: games,
        changeListQuantity,
        activeCurrency,
        setActiveCurrency,
        rates,
        status,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

const useGames = () => useContext(GamesContext);

export default useGames;
