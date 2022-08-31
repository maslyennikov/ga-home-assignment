import React, { useCallback, useContext, useState } from "react";

type CartContextState = {
  cartGames: Record<string, number>;
  addGame: (gameId: string, quantity: number) => void;
  removeGame: (gameId: string) => void;
  updateQuantity: (gameId: string, quantity: number) => void;
  isAdded: (gameId: string) => boolean;
};

type CartContextProviderProps = {
  children: React.ReactNode;
};

const initialCartContext: CartContextState = {
  cartGames: {},
  addGame: () => null,
  removeGame: () => null,
  updateQuantity: () => null,
  isAdded: () => false,
};

const CartContext = React.createContext<CartContextState>(initialCartContext);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartGames, setCartGames] = useState<Record<string, number>>({});

  const addGame = useCallback(
    (gameId: string, quantity: number): void => {
      setCartGames({ ...cartGames, [gameId]: quantity });
    },
    [cartGames]
  );

  const removeGame = useCallback(
    (gameId: string): void => {
      const cartGamesClone = { ...cartGames };
      delete cartGamesClone[gameId];

      setCartGames(cartGamesClone);
    },
    [cartGames]
  );

  const isAdded = useCallback(
    (gameId: string): boolean => !!cartGames[gameId],
    [cartGames]
  );

  const updateQuantity = useCallback(
    (gameId: string, quantity: number) => {
      setCartGames({ ...cartGames, [gameId]: quantity });
    },
    [cartGames]
  );

  return (
    <CartContext.Provider
      value={{
        cartGames,
        addGame,
        removeGame,
        isAdded,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export default useCart;
