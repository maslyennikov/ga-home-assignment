import React, { memo } from "react";
import { useHistory } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import "./styles.css";
import useCart from "../../hooks/useCart";

const CheckoutPage = memo(() => {
  const history = useHistory();
  const { cartGames } = useCart();

  return (
    <Layout
      title="Checkout"
      backButton={{
        text: "Go back to overview page",
        onClick: () => history.push("/list"),
      }}
    >
      <div className="CheckoutPage-container">
        <div className="CheckoutPage-GameList-container">[CheckoutPage]</div>

        <div className="CheckoutPage-Overview-container">
          [Order Details]
          <hr className="CheckoutPage-Divider" />
          <Button variant="link" fullWidth onClick={() => history.push("/")}>
            Back to overview
          </Button>
        </div>
      </div>
    </Layout>
  );
});

export default CheckoutPage;
