import { createStore } from "redux";
import { rootReducer } from "./reducer";

const initialState = {
  game_ready: false,
  cards: [],
  player: { name: "", cards: [], points: 0 },
  computer: { name: "computer", cards: [], points: 0 },
};

const store = createStore(rootReducer, initialState);

export default store;
