import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePlayerName,
  setGameReady,
  initGameCards,
} from "../../state/actions";

function Main() {
  const history = useHistory();
  const dispatch = useDispatch();
  const player = useSelector(({ player }) => player);

  useEffect(() => {
    dispatch(initGameCards());
  }, []);

  console.log(player);

  const handleClick = (e) => {
    e.preventDefault();
    if (player.name) {
      dispatch(setGameReady(true));
      history.replace("./game");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const val = target.value; // could be a player name input for example
    switch (target.id) {
      case "playerName":
        dispatch(updatePlayerName(val));
        break;
      default:
        break;
    }
  };

  return (
    <div>
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
