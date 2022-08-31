import React, { FC } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { CartContextProvider } from "./hooks/useCart";
import GameListPage from "./pages/GameListPage/GameListPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { GameContextProvider } from "./hooks/useGames";

const RootApp: FC = () => {
  return (
    <React.StrictMode>
      <Router>
        <GameContextProvider>
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
};

export default RootApp;
