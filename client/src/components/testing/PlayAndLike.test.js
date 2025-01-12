import PlayAndLike from "../PlayAndLike";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect"; // for better assertions
import React from "react";

const mockStore = configureStore([]);

let store;

beforeEach(() => {
  store = mockStore({});
});

const MockPlayAndLike = (isPlaying = false, isInPlaylist = false) => {
  return (
    <Provider store={store}>
      <PlayAndLike isPlaying={isPlaying} isInPlaylist={isInPlaylist} />
    </Provider>
  );
};

describe("PlayAndLike component", () => {
  test("renders Play icon by default", () => {
    render(<MockPlayAndLike isPlaying={false} />);
    const playIcon = screen.getByTestId("play-icon-playAndLike");

    expect(playIcon).toBeInTheDocument();
  });
});
