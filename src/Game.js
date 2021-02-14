import { Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { NUM_OF_CARDS } from "./constants";
import { shuffle } from "./helpers";

// action creator to distribute the cards at the beginning of the game
const distCards = () => ({
  type: "DIST_CARDS",
  payload: (state) => {
    const cards = [...state.cards];
    shuffle(cards);
    const computer_cards = cards.slice(0, NUM_OF_CARDS / 2);
    const player_cards = cards.slice(NUM_OF_CARDS / 2);
    const computer_current_card = computer_cards.pop();
    const player_current_card = player_cards.pop();
    return {
      ...state,
      cards,
      // distributes cards evenly
      computer: {
        ...state.computer,
        cards: computer_cards,
        current_card: computer_current_card,
        points: 0,
      },
      player: {
        ...state.player,
        cards: player_cards,
        current_card: player_current_card,
        points: 0,
      },
    };
  },
});

const setNextCards = () => ({
  type: "SET_NEXT_CARDS",
  payload: (state) => {
    let [computer_cards, player_cards] = [
      [...state.computer.cards],
      [...state.player.cards],
    ];
    const [computer_next_card, player_next_card] = [
      computer_cards.pop(),
      player_cards.pop(),
    ];
    return {
      ...state,
      player: {
        ...state.player,
        cards: player_cards,
        current_card: player_next_card,
      },
      computer: {
        ...state.computer,
        cards: computer_cards,
        current_card: computer_next_card,
      },
    };
  },
});

const pointsIncreament = () => ({
  type: "INCREASE_POINTS",
  payload: (state) => {
    const [player_current_card, computer_current_card] = [
      state.player.current_card,
      state.computer.current_card,
    ];
    return {
      ...state,
      player: {
        ...state.player,
        points:
          player_current_card > computer_current_card
            ? state.player.points + 1
            : state.player.points,
      },
      computer: {
        ...state.computer,
        points:
          player_current_card < computer_current_card
            ? state.computer.points + 1
            : state.computer.points,
      },
    };
  },
});

function Game() {
  const player = useSelector(({ player }) => player);
  const computer = useSelector(({ computer }) => computer);
  const game_ready = useSelector(({ game_ready }) => game_ready);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleReset = React.useCallback(() => {
    dispatch(distCards());
  }, [dispatch]);

  useEffect(() => {
    if (game_ready) {
      dispatch(distCards());
    } else {
      history.replace("/");
    }
  }, [game_ready]);

  useEffect(() => {
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
        <div>
          <div>{player.name}</div>
          <div>Points: {player.points}</div>
          <div>{player.current_card}</div>
        </div>
        <div>
          <div>{computer.current_card}</div>
          <div>Points: {computer.points}</div>
          <div>{computer.name}</div>
        </div>
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
