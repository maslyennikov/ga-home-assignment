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

const GameListPage = memo(() => {
  const { pageGames, changeListPageQuantity } = useGames();
  const { addGame, isAdded } = useCart();

  return (
    <Layout title="Games">
      {pageGames.map((game) => (
        <GameDetailsCard>
          <Image url={game.artworkUrl} />
          <div className="GameListPageCard__Components">
            <GeneralInfo title={game.name} releaseDate={game.releaseDate} />
            <Rating value={game.rating} />
            <Tags tags={game.tags} />
            <Quantity
              value={game.quantity.listQuantity}
              onChange={(quantity) => {
                changeListPageQuantity?.(game.id, quantity);
              }}
            />
            <Price value={game.price} />
            <AddToBasketButton
              isAdded={isAdded?.(game.id) || false}
              onClick={() => {
                addGame?.(game.id, game.quantity.listQuantity);
                changeListPageQuantity?.(game.id, 1);
              }}
            />
          </div>
        </GameDetailsCard>
      ))}
    </Layout>
  );
});

export default GameListPage;
