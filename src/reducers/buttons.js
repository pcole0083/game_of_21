import * as types from "../types";

const defaultState = {
  deck_id: "",
  allCards: [],
  player: [],
  dealer: [],
  dealerValues: [],
  playerValues: [],
  playerSum: 0,
  dealerSum: 0,
  winsPlayer: 0,
  winsDealer: 0,
  turn: "player"
};

export default (state = defaultState, action) => {
  switch (types[action.type]) {
    default:
      return { ...state, ...action.payload };
  }
};
