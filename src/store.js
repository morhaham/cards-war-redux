import { createStore } from "redux";

const state = {
  game_ready: false,
  cards: [],
  player: { name: "", cards: [], points: 0 },
  computer: { name: "computer", cards: [], points: 0 },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_GAME_CARDS":
      return action.payload(state);
    case "UPDATE_PLAYER_NAME":
      return action.payload(state);
    case "SET_GAME_READY":
      return action.payload(state);
    case "DIST_CARDS":
      return action.payload(state);
    case "SET_NEXT_CARDS":
      return action.payload(state);
    case "INCREASE_POINTS":
      return action.payload(state);
    case "RESET_GAME":
      return action.payload(state);
    default:
      return state;
  }
};

const store = createStore(reducer, state);

export default store;
