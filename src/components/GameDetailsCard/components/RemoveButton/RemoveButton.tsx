import React, { FC } from "react";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import Button from "components/Button/Button";
import "../../styles.css";

type RemoveButtonProps = {
  onClick: () => void;
};

const RemoveButton: FC<RemoveButtonProps> = ({ onClick }) => (
  <div className="PageCard__Component">
    <Button icon={<TrashIcon />} onClick={onClick}>
      REMOVE
    </Button>
  </div>
);

export default RemoveButton;
