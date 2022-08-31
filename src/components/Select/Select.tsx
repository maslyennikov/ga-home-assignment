import React, { ChangeEvent, FC, memo } from "react";
import "./styles.css";

type SelectProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: {
    label: string;
    value: string;
  }[];
};

const Select: FC<SelectProps> = ({ value, onChange, options }) => {
  return (
    <select className="Select" value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option
          key={`dropDownValue${option.value}${index}`}
          value={option.value}
          label={option.label}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default memo(Select);
