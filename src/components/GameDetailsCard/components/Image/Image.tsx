import React from "react";
import "./styles.css";

type ImageProps = {
  url: string;
};

const Image = ({ url }: ImageProps) => {
  return (
    <div className={"GameImage"} style={{ backgroundImage: `url(${url})` }} />
  );
};

export default Image;
