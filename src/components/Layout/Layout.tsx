import React, { FC, memo } from "react";
import AppBar, { AppBarProps } from "./../AppBar/AppBar";
import "./styles.css";

type LayoutProps = {
  title: string;
  backButton?: AppBarProps["backButton"];
};

const Layout: FC<LayoutProps> = memo(({ children, title, backButton }) => (
  <div className="Layout">
    <AppBar title={title} backButton={backButton} />

    <div className="Layout__content">{children}</div>
  </div>
));

export default Layout;
