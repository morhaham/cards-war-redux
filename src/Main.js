import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NUM_OF_CARDS, MAX_CARD_VALUE } from "./constants";
import { shuffle } from "./helpers";

// action creator to initialize the game
const initGameCards = () => ({
  type: "INIT_GAME_CARDS",
  payload: (state) => {
    // creates an array of size 52 filled with 1..13 four times
    const cards = Array(NUM_OF_CARDS / MAX_CARD_VALUE)
      .fill(
        Array(13)
          .fill()
          .map((_, i) => i + 1)
      )
      .flat();
    // shuffle the cards
    shuffle(cards);
    return {
      ...state,
      cards,
    };
  },
});

// action creator to control the player's name
const updatePlayerName = (name) => ({
  type: "UPDATE_PLAYER_NAME",
  payload: (state) => ({
    ...state,
    player: { ...state.player, name: name },
  }),
});

const setGameReady = () => ({
  type: "SET_GAME_READY",
  payload: (state) => ({
    ...state,
    game_ready: true,
  }),
});

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(({ player }) => player);
  // const game_ready = useSelector(({ game_ready }) => game_ready);

  const handleClick = React.useCallback(
    (e) => {
      e.preventDefault();
      if (player.name) {
        dispatch(setGameReady());
        history.replace("./game");
      }
    },
    [dispatch, player.name]
  );

  useEffect(() => {
    dispatch(initGameCards());
  }, []);

  const handleChange = React.useCallback((e) => {
    const target = e.target;
    const val = target.value;
    switch (target.id) {
      case "playerName":
        dispatch(updatePlayerName(val));
        break;
      default:
        break;
    }
  });

  return (
    <div>
      {/* check for valid input */}
      <form>
        <label htmlFor="playerName">
          <h1 className="text-blue-800 text-5xl text-shadow-lg mb-3">
            Ready for war
          </h1>
        </label>
        <input
          className="border focus:ring-2 focus:outline-none"
          id="playerName"
          required
          onChange={handleChange}
          placeholder="Enter your name"
          type="text"
          value={player.name}
        />
        {!player.name ? (
          <p className="text-red-700">Please fill the field</p>
        ) : (
          ""
        )}
        <Button
          onClick={handleClick}
          type="submit"
          color="primary"
          variant="contained"
        >
          Start
        </Button>
      </form>
    </div>
  );
}

export default Main;
