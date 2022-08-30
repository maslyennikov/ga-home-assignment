import React, { useContext, useEffect, useState } from "react";

import { Currency, Game, PageGame } from "../types";
import { ratesInitialState } from "../constants";

type GamesContextState = {
  pageGames: Array<PageGame>;
  changeListPageQuantity: ((gameId: string, quantity: number) => void) | null;
  changeCheckoutPageQuantity:
    | ((gameId: string, quantity: number) => void)
    | null;
  rates: Record<Currency, number>;
};

type GameContextProviderProps = {
  children: React.ReactNode;
  gamesData: Array<Game> | null;
  rates: Record<Currency, number> | null;
};

const GamesContext = React.createContext<GamesContextState>({
  pageGames: [],
  changeListPageQuantity: null,
  changeCheckoutPageQuantity: null,
  rates: ratesInitialState,
});

export const GameContextProvider = ({
  children,
  gamesData,
  rates: ratesData,
}: GameContextProviderProps) => {
  const [pageGames, setPageGames] = useState<Array<PageGame>>([]);
  const [rates, setRates] = useState<Record<Currency, number>>(
    ratesInitialState
  );

  useEffect(() => {
    if (ratesData) {
      setRates(ratesData);
    }
  }, [ratesData]);
  useEffect(() => {
    if (gamesData) {
      setPageGames(
        gamesData.map((game) => ({
          ...game,
          quantity: { checkoutQuantity: 1, listQuantity: 1 },
        }))
      );
    }
  }, [gamesData]);

  const changeListPageQuantity = (gameId: string, quantity: number) => {
    const updatedPageGames = pageGames.map((game) =>
      game.id === gameId
        ? {
            ...game,
            quantity: {
              checkoutQuantity: game.quantity.checkoutQuantity,
              listQuantity: quantity,
            },
          }
        : game
    );

    if (updatedPageGames) {
      setPageGames(updatedPageGames);
    }
  };
  const changeCheckoutPageQuantity = (gameId: string, quantity: number) => {
    const updatedPageGames = pageGames.map((game) =>
      game.id === gameId
        ? {
            ...game,
            quantity: {
              listQuantity: game.quantity.listQuantity,
              checkoutQuantity: quantity,
            },
          }
        : game
    );

    if (updatedPageGames) {
      setPageGames(updatedPageGames);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        pageGames,
        changeListPageQuantity,
        changeCheckoutPageQuantity,
        rates,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

const useGames = () => useContext(GamesContext);

export default useGames;
