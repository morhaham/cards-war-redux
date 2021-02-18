import { Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { distCards, setNextCards, pointsIncreament } from "../../state/actions";
import Player from "../player/Player";
import Card from "../card/Card";

function Game() {
  const player = useSelector(({ player }) => player);
  const computer = useSelector(({ computer }) => computer);
  const game_ready = useSelector(({ game_ready }) => game_ready);
  const cards = useSelector(({ cards }) => cards);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleReset = () => {
    dispatch(distCards(cards));
  };

  useEffect(() => {
    if (game_ready) {
      console.log(cards);
      dispatch(distCards(cards));
    } else {
      history.replace("/");
    }
  }, [game_ready]);

  useEffect(() => {
    //  in the first component mount, current_card is undefined. so we have to check for it.
    if (player.current_card && computer.current_card) {
      dispatch(pointsIncreament());
    }
  }, [player.current_card, computer.current_card]);

  const handleClick = React.useCallback(() => {
    dispatch(setNextCards());
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        <Player>
          <Player.Name name={computer.name} />
          <Player.Points points={computer.points} />
          <Card current_card={computer.current_card} />
        </Player>
        <Player>
          <Card current_card={player.current_card} />
          <Player.Points points={player.points} />
          <Player.Name name={player.name} />
        </Player>
        {!player.cards.length || !computer.cards.length ? (
          <Button
            onClick={handleReset}
            type="submit"
            color="primary"
            variant="contained"
          >
            Again?
          </Button>
        ) : (
          <Button
            onClick={handleClick}
            type="submit"
            color="primary"
            variant="contained"
          >
            next
          </Button>
        )}
        <div>
          {!player.cards.length || !computer.cards.length ? (
            player.points === computer.points ? (
              <h2>It's a tie</h2>
            ) : player.points > computer.points ? (
              <h2>{player.name} won!</h2>
            ) : (
              <h2>{computer.name} won!</h2>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Game;
