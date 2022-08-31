import React, { FC } from "react";
import "./styles.css";
import "../../styles.css";

type GeneralInfoProps = {
  title: string;
  releaseDate: string;
};

const GeneralInfo: FC<GeneralInfoProps> = ({ title, releaseDate }) => (
  <div className="PageCard__Component">
    <div className="GeneralInfo__Aligner">
      <div className="GeneralInfo__ReleaseDate">{releaseDate}</div>
      <div className="GeneralInfo__Title">{title}</div>
    </div>
  </div>
);

export default GeneralInfo;
