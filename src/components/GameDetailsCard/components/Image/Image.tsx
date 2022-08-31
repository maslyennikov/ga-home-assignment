import React, { FC } from "react";
import "./styles.css";

type ImageProps = {
  url: string;
};

const Image: FC<ImageProps> = ({ url }) => (
  <div
    className="GameImage__Container"
    style={{ backgroundImage: `url(${url})` }}
  />
);

export default Image;
