import React, { useContext, useState } from "react";
import { CartGame, PageGame } from "../types";
import useGames from "./useGames";

type CartContextState = {
  cartGames: Array<CartGame>;
  pageGames: Array<PageGame>;
  addGame: ((gameId: string, quantity: number) => void) | null;
  removeGame?: ((gameId: string, quantity: number) => void) | null;
};

const CartContext = React.createContext<CartContextState>({
  cartGames: [],
  pageGames: [],
  addGame: null,
  removeGame: null,
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

  const removeGame = (gameId: string, quantity: number) => {
    setCartGames(cartGames.filter((game) => game.id === gameId));
  };

  return (
    <CartContext.Provider
      value={{
        cartGames,
        pageGames,
        addGame,
        removeGame,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export default useCart;
