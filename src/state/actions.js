import { shuffle } from "../helpers";

// action creator to distribute the cards at the beginning of the game
export const distCards = (cards) => {
  console.log(cards);
  shuffle(cards);
  return {
    type: "DIST_CARDS",
    payload: cards,
  };
};

export const setNextCards = () => ({
  type: "SET_NEXT_CARDS",
});

export const pointsIncreament = () => ({
  type: "INCREASE_POINTS",
});

// action creator to initialize the game
export const initGameCards = () => ({
  type: "INIT_GAME_CARDS",
});

// action creator to control the player's name
export const updatePlayerName = (name) => ({
  type: "UPDATE_PLAYER_NAME",
  payload: name,
});

export const setGameReady = (isReady) => ({
  type: "SET_GAME_READY",
  payload: isReady,
});
