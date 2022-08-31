import React, { memo, useMemo } from "react";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import GameDetailsCard from "../../components/GameDetailsCard/GameDetailsCard";
import Image from "../../components/GameDetailsCard/components/Image/Image";
import useCart from "../../hooks/useCart";
import GeneralInfo from "../../components/GameDetailsCard/components/GeneralInfo/GeneralInfo";
import Quantity from "../../components/GameDetailsCard/components/Quantity/Quantity";
import Price from "../../components/GameDetailsCard/components/Price/Price";
import RemoveButton from "../../components/GameDetailsCard/components/RemoveButton/RemoveButton";
import { CurrencySymbol } from "../../constants";
import useGames from "../../hooks/useGames";
import "./styles.css";

const getTotalItems = (cartGames: Record<string, number>) =>
  Object.keys(cartGames).reduce((acc, gameId) => acc + cartGames[gameId], 0);
const getOrderValue = (
  items: Array<{ quantity: number; price: number }>
): number => items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);

const CheckoutPage = memo(() => {
  const history = useHistory();
  const { cartGames, removeGame, updateQuantity } = useCart();
  const { games, rates, activeCurrency } = useGames();
  const orderValue = useMemo(() => {
    const orderData = Object.keys(cartGames).map((gameId) => ({
      quantity: cartGames[gameId],
      price: games[gameId].price,
    }));
    return (getOrderValue(orderData) * rates[activeCurrency]).toFixed(2);
  }, [activeCurrency, games, cartGames, rates]);

  const renderGames = () =>
    Object.keys(cartGames).map((gameId, key) => (
      <GameDetailsCard key={key}>
        <Image url={games[gameId].artworkUrl} />
        <div className="CheckoutPageCard__Components">
          <GeneralInfo
            title={games[gameId].name}
            releaseDate={games[gameId].releaseDate}
          />
          <Quantity
            value={cartGames[gameId]}
            onChange={(quantity) => {
              updateQuantity(gameId, quantity);
            }}
          />
          <Price value={games[gameId].price} />
          <RemoveButton
            onClick={() => {
              removeGame(gameId);
            }}
          />
        </div>
      </GameDetailsCard>
    ));
  return (
    <Layout
      title="Checkout"
      backButton={{
        text: "Go back to overview page",
        onClick: () => history.push("/list"),
      }}
    >
      <div className="CheckoutPage-container">
        <div className="CheckoutPage-GameList-container">
          {cartGames.length !== 0 ? renderGames() : "Empty Cart"}
        </div>

        <div className="CheckoutPage-Overview-container">
          <div className="CheckoutPage__OrderValue">
            <span>Order Value</span>
            <span>
              {activeCurrency} {CurrencySymbol[activeCurrency]}
              {orderValue}
            </span>
          </div>
          <div className="CheckoutPage__TotalItems">
            <span>Total Items</span>
            <span>{getTotalItems(cartGames)}</span>
          </div>
          <hr className="CheckoutPage-Divider" />
          <Button variant="link" fullWidth onClick={() => history.push("/")}>
            Back to overview
          </Button>
        </div>
      </div>
    </Layout>
  );
});

export default CheckoutPage;
