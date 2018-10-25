import * as types from "../types"; //import all the types from types/index.js
//import update from "immutability-helper";

//applicaiton starting state
const defaultState = {
  deck_id: "",
  player: [],
  dealer: [],
  dealerValues: [],
  playerValues: [],
  playerSum: 0,
  pVsum: 0,
  dealerSum: 0,
  dVsum: 0,
  winsPlayer: 0,
  winsDealer: 0,
  turn: "player"
};

/**
 * We only really need one reducer because this application is very small.
 * Unlike the actions, we can * import the actions to make things easier.
 */
export default (state = defaultState, action) => {
  let oldState = Object.assign(defaultState, state);
  switch (action.type) {
    case types.END_GAME:
      return { ...defaultState, ...action.payload }; //we use update here because we want to reset most of the fields but not all
    case types.START_GAME:
    case types.DRAW_CARD:
    case types.FLIP_CARD:
    case types.END_TURN:
      return { ...oldState, ...action.payload }; //this is the generic action that we can take.
    default:
      return { ...oldState }; //we want to be safe and make sure no unauthorized actions take place
  }
};
