import React, { FC } from "react";
import { ReactComponent as PlusIcon } from "assets/icons/plus.svg";
import { ReactComponent as CheckIcon } from "assets/icons/check.svg";
import Button from "components/Button/Button";
import "../../styles.css";

type AddToBasketButtonProps = {
  isAdded: boolean;
  onClick: () => void;
};

const AddToBasketButton: FC<AddToBasketButtonProps> = ({
  isAdded,
  onClick,
}) => {
  const icon = isAdded ? <CheckIcon /> : <PlusIcon />;
  const label = isAdded ? "Added" : "Add to basket";
  const variant = isAdded ? undefined : "primary";

  return (
    <div
      className="PageCard__Component"
      data-testid="AddToBasketButton__Container"
    >
      <Button icon={icon} variant={variant} onClick={onClick}>
        {label}
      </Button>
    </div>
  );
};

export default AddToBasketButton;
