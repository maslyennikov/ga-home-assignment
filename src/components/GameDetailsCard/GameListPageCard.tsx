import React from "react";

import { PageGame } from "../../types";
import useGames from "../../hooks/useGames";
import useCart from "../../hooks/useCart";
import GeneralInfo from "./components/GeneralInfo/GeneralInfo";
import Rating from "./components/Rating/Rating";
import Tags from "./components/Tags/Tags";
import Quantity from "./components/Quantity/Quantity";
import Price from "./components/Price/Price";
import Image from "./components/Image/Image";
import AddToBasketButton from "./components/AddToBasketButton/AddToBasketButton";
import "./styles.css";

type GameListPageCardProps = {
  game: PageGame;
};

const GameListPageCard = ({ game }: GameListPageCardProps) => {
  const { changeListPageQuantity } = useGames();
  const { addGame } = useCart();

  return (
    <div className={"GameListPageCard__Container"}>
      <Image url={game.artworkUrl} />
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
        isAdded={false}
        onClick={() => {
          addGame?.(game.id, game.quantity.listQuantity);
          changeListPageQuantity?.(game.id, 1);
        }}
      />
    </div>
  );
};

export default GameListPageCard;
