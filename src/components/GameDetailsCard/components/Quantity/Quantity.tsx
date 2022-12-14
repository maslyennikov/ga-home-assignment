import React, { FC, useCallback } from "react";

import Button from "components/Button/Button";
import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import { ReactComponent as SubtractIcon } from "assets/icons/subtract.svg";
import "./styles.css";
import "../../styles.css";

type QuantityProps = {
  value: number;
  onChange?: (newValue: number) => void;
  changeQuantityEnabled?: boolean;
};

const Quantity: FC<QuantityProps> = ({ value, onChange }) => {
  const handleDecreaseClick = useCallback(() => {
    if (value > 1) {
      onChange?.(value - 1);
    }
  }, [onChange, value]);

  const handleIncreaseClick = useCallback(() => {
    onChange?.(value + 1);
  }, [onChange, value]);

  return (
    <div className="PageCard__Component">
      <div>
        <div className="Quantity__label">Quantity</div>
        <div
          className="Quantity__buttonsContainer"
          data-testid="Quantity__buttonsContainer"
        >
          <Button onClick={handleDecreaseClick} variant="secondary">
            <SubtractIcon />
          </Button>
          <div className={"Quantity__value"}>{value}</div>
          <Button onClick={handleIncreaseClick} variant="secondary">
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Quantity;
