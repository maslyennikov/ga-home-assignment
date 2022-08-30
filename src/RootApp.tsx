import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CartContextProvider } from "./hooks/useCart";
import useFetch, { Status } from "./hooks/useFetch";
import GameListPage from "./pages/GameListPage/GameListPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { GAMES_URL, RATES_URL } from "./constants";
import { Currency, Game } from "./types";
import { GameContextProvider } from "./hooks/useGames";

const RootApp = memo(() => {
  const { data: gamesData, status } = useFetch<{ games: Array<Game> }>(
    GAMES_URL
  );
  const { data: ratesData } = useFetch<Record<Currency, number>>(RATES_URL);

  if (status === Status.ERROR) {
    return <>An error occurred, please refresh the page.</>;
  } else if (status !== Status.FETCHED) {
    return <>Loading...</>;
  }

  return (
    <React.StrictMode>
      <Router>
        <GameContextProvider
          gamesData={gamesData?.games || null}
          rates={ratesData}
        >
          <CartContextProvider>
            <Switch>
              <Route path="/list">
                <GameListPage />
              </Route>

              <Route path="/checkout">
                <CheckoutPage />
              </Route>
              <Redirect from="*" to="/list" />
            </Switch>
          </CartContextProvider>
        </GameContextProvider>
      </Router>
    </React.StrictMode>
  );
});

export default RootApp;
