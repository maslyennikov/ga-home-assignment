import React, { useContext, useState } from "react";
import { CartGame, PageGame } from "../types";
import useGames from "./useGames";

type CartContextState = {
  cartGames: Array<CartGame>;
  addGame?: (gameId: string, quantity: number) => void;
  removeGame?: (gameId: string) => void;
  isAdded?: (gameId: string) => boolean;
};

const CartContext = React.createContext<CartContextState>({
  cartGames: [],
  addGame: undefined,
  removeGame: undefined,
  isAdded: undefined,
});

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cartGames, setCartGames] = useState<Array<CartGame>>([]);
  const { pageGames } = useGames();

  const addGame = (gameId: string, quantity: number) => {
    if (cartGames.findIndex((game) => game.id === gameId) === -1) {
      const gameDetails = pageGames.find((game) => game.id === gameId);
      if (gameDetails) {
        setCartGames([
          ...cartGames,
          {
            ...gameDetails,
            quantity,
          },
        ]);
      } else {
        throw new Error("invalid gameId");
      }
    } else {
      const updatedCart = cartGames.map((game) => {
        if (game.id === gameId) {
          return { ...game, quantity: game.quantity + quantity };
        }

        return game;
      });

      setCartGames(updatedCart);
    }
  };

  const removeGame = (gameId: string): void => {
    setCartGames(cartGames.filter((game) => game.id !== gameId));
  };

  const isAdded = (gameId: string): boolean => {
    return cartGames.findIndex((game) => game.id === gameId) > -1;
  };

  return (
    <CartContext.Provider
      value={{
        cartGames,
        addGame,
        removeGame,
        isAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export default useCart;
