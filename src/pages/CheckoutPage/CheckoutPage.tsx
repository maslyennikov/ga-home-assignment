import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import GameDetailsCard from "../../components/GameDetailsCard/GameDetailsCard";
import Image from "../../components/GameDetailsCard/components/Image/Image";
import useCart from "../../hooks/useCart";
import GeneralInfo from "../../components/GameDetailsCard/components/GeneralInfo/GeneralInfo";
import "./styles.css";
import Quantity from "../../components/GameDetailsCard/components/Quantity/Quantity";
import Price from "../../components/GameDetailsCard/components/Price/Price";
import RemoveButton from "../../components/GameDetailsCard/components/RemoveButton/RemoveButton";
import { CartGame } from "../../types";

const getOrderValue = (items: Array<CartGame>) =>
  items.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
const getTotalItems = (items: Array<CartGame>) =>
  items.reduce((acc, curr) => acc + curr.quantity, 0);

const CheckoutPage = memo(() => {
  const history = useHistory();
  const { cartGames, removeGame } = useCart();
  const isCartEmpty = cartGames.length === 0;

  const renderGames = () =>
    cartGames.map((game) => (
      <GameDetailsCard>
        <Image url={game.artworkUrl} />
        <div className="CheckoutPageCard__Components">
          <GeneralInfo title={game.name} releaseDate={game.releaseDate} />
          <Quantity
            value={game.quantity}
            onChange={(quantity) => {
              console.log(quantity);
            }}
            changeQuantityEnabled={false}
          />
          <Price value={game.price} />
          <RemoveButton
            onClick={() => {
              removeGame?.(game.id);
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
          {!isCartEmpty ? renderGames() : "Empty Cart"}
        </div>

        <div className="CheckoutPage-Overview-container">
          <div className="CheckoutPage__OrderValue">
            <span>Order Value</span>
            <span>USD ${getOrderValue(cartGames)}</span>
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
