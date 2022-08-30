import React from "react";
import "./styles.css";
import "../../styles.css";

const Price = (props: { value: number }) => {
  return (
    <div className="Price GameListPageCard__Component">
      <div className="Price__aligner">{props.value}$</div>
    </div>
  );
};

export default Price;
