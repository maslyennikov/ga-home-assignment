import React, { FC } from "react";
import "./styles.css";

type GameListPageCardProps = {
  children: React.ReactNode;
};

const GameDetailsCard: FC<GameListPageCardProps> = ({ children }) => (
  <div
    className={"GameListPageCard__Container"}
    data-testid={"GameListPageCard"}
  >
    {children}
  </div>
);

export default GameDetailsCard;
