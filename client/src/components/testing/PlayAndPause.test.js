import "@testing-library/jest-dom/extend-expect"; // for better assertions
import PlayAndPause from "../PlayAndPause";
import React from "react";
import configureStore from "redux-mock-store";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  setIsPlaying,
  setActiveSong,
  setRecentSongs,
  removeRecentSongs,
} from "../../redux/features/playerSlice";

const mockStore = configureStore([]);

let store;

beforeEach(() => {
  store = mockStore({});
});

const mockSong = {
  _id: "mock-song-id", // Ensure a valid _id property
  // other properties of the song object
};

const MockPlayAndPause = ({
  isPlaying = false,
  mockSong = { _id: "mock-song-id" },
}) => {
  return (
    <Provider store={store}>
      <PlayAndPause isPlaying={isPlaying} song={mockSong} />
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

  test("calls Redux actions when Play icon is clicked", () => {
    store.dispatch = jest.fn();

    render(<MockPlayAndPause isPlaying={false} mockSong={mockSong} />);
    const playIcon = screen.getByTestId("play-icon");

    fireEvent.click(playIcon);
    expect(store.dispatch).toHaveBeenCalledWith(
      setRecentSongs(expect.objectContaining({ _id: "mock-song-id" }))
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      setActiveSong(expect.any(Object))
    );
    expect(store.dispatch).toHaveBeenCalledWith(setIsPlaying(true));
    expect(store.dispatch).toHaveBeenCalledWith(removeRecentSongs());
  });

  test("calls handlePauseClick when pause icon is clicked", () => {
    store.dispatch = jest.fn();

    render(<MockPlayAndPause />);
    const pauseIcon = screen.getByTestId("pause-icon");

    fireEvent.click(pauseIcon);

    expect(store.dispatch).toHaveBeenCalledWith(setIsPlaying(false));
  });
});
