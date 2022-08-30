import React, { memo } from "react";

import Layout from "../../components/Layout/Layout";
import GameListPageCard from "../../components/GameDetailsCard/GameListPageCard";
import useGames from "../../hooks/useGames";
import useCart from "../../hooks/useCart";

const GameListPage = memo(() => {
  const { pageGames, changeListPageQuantity } = useGames();
  const { addGame } = useCart();

  return (
    <Layout title="Games">
      {pageGames.map((game, key) => (
        <GameListPageCard game={game} key={key} />
      ))}
    </Layout>
  );
});

export default GameListPage;
