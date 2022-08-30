import React from "react";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import Button from "components/Button/Button";
import "../../styles.css";

type RemoveButtonProps = {
  onClick: () => void;
};

const RemoveButton = ({ onClick }: RemoveButtonProps) => {
  return (
    <div className="PageCard__Component">
      <Button icon={<TrashIcon />} variant={undefined} onClick={onClick}>
        REMOVE
      </Button>
    </div>
  );
};

export default RemoveButton;
