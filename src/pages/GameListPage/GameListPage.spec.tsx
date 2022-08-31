import { getAllByTestId, render } from "@testing-library/react";
import GameListPage from "./GameListPage";
import React from "react";
import { Game } from "../../types";

const mockChangeListQuantity = jest.fn();
const mockAddGame = jest.fn();
jest.mock("../../hooks/useGames", () => () => {
  return {
    games: {
      "1152350815": {
        artworkUrl:
          "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/f8/b5/fe/f8b5fead-500d-59ed-25e0-dca91d6aba1c/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png/200x200bb.png",
        name: "FINALFANTASY XV POCKET EDITION",
        rating: 4,
        tags: ["Games", "Action", "Role Playing"],
        releaseDate: "2018-02-08",
        price: 2.1,
        quantity: 1,
      },
      "1287138671": {
        artworkUrl:
          "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/7b/b0/2e/7bb02eeb-74c7-e6c1-994a-ed9929d74469/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/200x200bb.png",
        name: "Thumper: Pocket Edition",
        rating: 5,
        tags: ["Games", "Music", "Action"],
        releaseDate: "2018-01-24",
        price: 4.7,
        quantity: 1,
      },
    },
    status: "FETCHED",
    rates: {
      USD: 1,
      EUR: 0.8738967054,
      GBP: 0.7869876781,
    },
    activeRate: "USD",
    changeListQuantity: mockChangeListQuantity,
  };
});
jest.mock("../../hooks/useCart", () => () => {
  return {
    cartGames: {},
    isAdded: (gameId: string) => false,
    addGame: mockAddGame,
  };
});
const useGames = require("../../hooks/useGames");
const useCart = require("../../hooks/useCart");

describe("GameListPage", () => {
  it("should render two GameListPageCard components with the mocked games", () => {
    const { getAllByTestId } = render(<GameListPage />);

    expect(getAllByTestId("GameListPageCard")).toHaveLength(2);
  });

  it("should update quantity when quantity decrease/increase button is clicked", () => {
    const { getAllByTestId } = render(<GameListPage />);
    const firstGameListPageCard = getAllByTestId("GameListPageCard")[0];
    const [
      subtractButton,
      increaseButton,
    ] = firstGameListPageCard.getElementsByTagName("button");

    subtractButton.click();
    expect(useGames().changeListQuantity).not.toHaveBeenCalled();
    increaseButton.click();
    expect(useGames().changeListQuantity).toHaveBeenCalled();
    subtractButton.click();
    expect(useGames().changeListQuantity).toHaveBeenCalled();
  });

  it("should add a game to cart if 'Add to Cart' button is pressed", () => {
    const { getAllByTestId } = render(<GameListPage />);
    const firstAddToBasketContainer = getAllByTestId(
      "AddToBasketButton__Container"
    )[0];

    const [addToBasketButton] = firstAddToBasketContainer.getElementsByTagName(
      "button"
    );

    addToBasketButton.click();
    expect(useCart().addGame).toHaveBeenCalled();
  });
});
