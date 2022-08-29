import React, { FC, memo } from "react";
import AppBar, { AppBarProps } from "./../AppBar/AppBar";
import "./styles.css";

const Layout: FC<{
  title: string;
  backButton?: AppBarProps["backButton"];
}> = memo(({ children, title, backButton }) => {
  return (
    <div className="Layout">
      <AppBar title={title} backButton={backButton} />

      <div className="Layout__content">{children}</div>
    </div>
  );
});

export default Layout;
