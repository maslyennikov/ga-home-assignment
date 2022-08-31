import React, { memo, FC, useState, ChangeEvent, useCallback } from "react";
import { useHistory } from "react-router-dom";

import Select from "./../Select/Select";
import Button from "./../Button/Button";
import { ReactComponent as Cart } from "./../../assets/icons/cart.svg";
import { ReactComponent as ArrowBack } from "./../../assets/icons/arrow-back.svg";
import "./styles.css";
import useCart from "../../hooks/useCart";
import { Currency } from "../../types";
import useGames from "../../hooks/useGames";

export type AppBarProps = {
  title: string;
  backButton?: {
    onClick: () => void;
    text: string;
  };
};

const AppBar: FC<AppBarProps> = memo(({ title, backButton }) => {
  const history = useHistory();
  const { cartGames } = useCart();
  const { setActiveCurrency, activeCurrency } = useGames();
  const [value, setValue] = useState<string>(activeCurrency);
  const handleOnChangeCurrency = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setValue(e.target.value);
      setActiveCurrency(e.target.value as Currency);
    },
    [setValue, setActiveCurrency]
  );

  return (
    <div className="AppBar">
      <div className="AppBar__TitleContainer">
        <div className="AppBar__Title">{title}</div>

        {!!backButton && (
          <div
            className="AppBar__BackButton__Label"
            onClick={backButton.onClick}
          >
            <ArrowBack className="AppBar__BackButton__Icon" />

            {backButton.text}
          </div>
        )}
      </div>

      <div className="AppBar__ActionsContainer">
        <div className="AppBar__Actions_Item">
          <Button
            variant="link"
            icon={
              <div className="AppBar__CartIconContainer">
                <Cart />
                <div className="AppBar__CartItemsBadge">
                  {Object.keys(cartGames).length}
                </div>
              </div>
            }
            onClick={() => history.push("/checkout")}
          >
            CHECKOUT
          </Button>
        </div>

        <div className="AppBar__Actions_Item">
          <Select
            value={value}
            onChange={handleOnChangeCurrency}
            options={[
              {
                label: "USD ($)",
                value: Currency.USD,
              },
              {
                label: "EUR (€)",
                value: Currency.EUR,
              },
              {
                label: "GBP (£)",
                value: Currency.GBP,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
});

export default memo(AppBar);
