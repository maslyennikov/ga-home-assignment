import React from "react";
import "./styles.css";

type GameListPageCardProps = {
  children: React.ReactNode;
};

const GameDetailsCard = ({ children }: GameListPageCardProps) => {
  return <div className={"GameListPageCard__Container"}>{children}</div>;
};

export default GameDetailsCard;
