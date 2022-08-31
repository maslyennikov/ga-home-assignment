import React, { FC, useMemo } from "react";
import "./styles.css";
import "../../styles.css";
import useGames from "../../../../hooks/useGames";
import { CurrencySymbol } from "../../../../constants";

type PriceProps = {
  value: number;
};

const Price: FC<PriceProps> = ({ value }) => {
  const { rates, activeCurrency } = useGames();
  const price = useMemo(() => (value * rates[activeCurrency]).toFixed(2), [
    value,
    rates,
    activeCurrency,
  ]);

  return (
    <div className="Price PageCard__Component">
      <div className="Price__Aligner">
        {price}
        {CurrencySymbol[activeCurrency]}
      </div>
    </div>
  );
};

export default Price;
