import "@testing-library/jest-dom/extend-expect"; // for better assertions
import PlayAndPause from "../PlayAndPause";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import store from "../../redux/store";
import { Provider } from "react-redux";

const MockPlayAndPause = ({ isPlaying, onPlayClick }) => {
  return (
    <Provider store={store}>
      <PlayAndPause isPlaying={isPlaying} onPlayClick={onPlayClick} />
    </Provider>
  );
};

describe("PlayAndPause component", () => {
  test("renders Play icon by default", () => {
    render(<MockPlayAndPause isPlaying={false} />);
    const playIcon = screen.getByTestId("play-icon");

    expect(playIcon).toBeInTheDocument();
  });

  test("renders Pause icon when isPlaying is true", () => {
    render(<MockPlayAndPause isPlaying={true} />);
    const pauseIcon = screen.getByTestId("pause-icon");

    expect(pauseIcon).toBeInTheDocument();
  });

  test("calls handlePlayClick when Play icon is clicked", () => {
    const handlePlayClick = jest.fn();
    render(
      <MockPlayAndPause isPlaying={false} onPlayClick={handlePlayClick} />
    );
    const playIcon = screen.getByTestId("play-icon");

    fireEvent.click(playIcon);
    expect(handlePlayClick).toHaveBeenCalledTimes(1);
  });

  test("calls handlePauseClick when pause icon is clicked", () => {
    const handlePauseClick = jest.fn();
    render(
      <MockPlayAndPause isPlaying={true} onPlayClick={handlePauseClick} />
    );
    const playIcon = screen.getByTestId("pause-icon");

    fireEvent.click(playIcon);
    expect(handlePauseClick).toHaveBeenCalledTimes(1);
  });
});
