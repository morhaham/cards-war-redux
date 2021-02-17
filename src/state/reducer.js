import { NUM_OF_CARDS, MAX_CARD_VALUE } from "../constants";

export const rootReducer = (state = null, action) => {
  switch (action.type) {
    case "INIT_GAME_CARDS":
      return initGameCards(state);
    case "UPDATE_PLAYER_NAME":
      // payload contains a new player name
      return updatePlayerName(state, action.payload);
    case "SET_GAME_READY":
      // payload contains a boolean indicates if game is ready
      return setGameReady(state, action.payload);
    case "DIST_CARDS":
      // the payload is the current cards in state - but shuffled
      return distCards(state, action.payload);
    case "SET_NEXT_CARDS":
      return setNextCards(state);
    case "INCREASE_POINTS":
      return increasePoints(state);
    default:
      return state;
  }
};

// creates an array of size 52 filled with 1..13 four times
const initGameCards = (state) => {
  const cards = Array(NUM_OF_CARDS / MAX_CARD_VALUE)
    .fill(
      Array(13)
        .fill()
        .map((_, i) => i + 1)
    )
    .flat();
  return {
    ...state,
    cards,
  };
};

// updates the player name
const updatePlayerName = (state, name) => ({
  ...state,
  player: { ...state.player, name: name },
});

const setGameReady = (state, isReady) => ({
  ...state,
  game_ready: isReady,
});

const setNextCards = (state) => {
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
};

const distCards = (state, cards) => {
  console.log(state);
  const computer_cards = cards.slice(0, NUM_OF_CARDS / 2);
  const player_cards = cards.slice(NUM_OF_CARDS / 2);
  const computer_current_card = computer_cards.pop();
  const player_current_card = player_cards.pop();
  return {
    ...state,

    cards: cards,
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
};

const increasePoints = (state) => {
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
};
