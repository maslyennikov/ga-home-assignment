import React, { memo } from "react";

import useGames from "../../hooks/useGames";
import useCart from "../../hooks/useCart";
import Layout from "../../components/Layout/Layout";
import GameDetailsCard from "../../components/GameDetailsCard/GameDetailsCard";
import Image from "../../components/GameDetailsCard/components/Image/Image";
import GeneralInfo from "../../components/GameDetailsCard/components/GeneralInfo/GeneralInfo";
import Rating from "../../components/GameDetailsCard/components/Rating/Rating";
import Tags from "../../components/GameDetailsCard/components/Tags/Tags";
import Quantity from "../../components/GameDetailsCard/components/Quantity/Quantity";
import Price from "../../components/GameDetailsCard/components/Price/Price";
import AddToBasketButton from "../../components/GameDetailsCard/components/AddToBasketButton/AddToBasketButton";
import { Status } from "../../types";

const GameListPage = memo(() => {
  const { games, status, changeListQuantity } = useGames();
  const { cartGames, addGame, isAdded, updateQuantity } = useCart();

  if (status === Status.ERROR) {
    return <>An error occurred, please refresh the page.</>;
  } else if (status !== Status.FETCHED) {
    return <>Loading...</>;
  }

  return (
    <Layout title="Games">
      {Object.keys(games).map((gameId) => (
        <GameDetailsCard key={`GameCard_${gameId}`}>
          <Image url={games[gameId].artworkUrl} />
          <div className="GameListPageCard__Components">
            <GeneralInfo
              title={games[gameId].name}
              releaseDate={games[gameId].releaseDate}
            />
            <Rating value={games[gameId].rating} />
            <Tags tags={games[gameId].tags} />
            <Quantity
              value={
                isAdded(gameId) ? cartGames[gameId] : games[gameId].quantity
              }
              onChange={(quantity) => {
                if (!isAdded(gameId)) {
                  changeListQuantity(gameId, quantity);
                } else {
                  updateQuantity(gameId, quantity);
                }
              }}
            />
            <Price value={games[gameId].price} />
            <AddToBasketButton
              isAdded={isAdded(gameId) || false}
              onClick={() => {
                addGame(gameId, games[gameId].quantity);
                changeListQuantity(gameId, 1);
              }}
            />
          </div>
        </GameDetailsCard>
      ))}
    </Layout>
  );
});

export default GameListPage;
