import { START_GAME, DRAW_CARD, FLIP_CARD, END_TURN, END_GAME } from "../types";
//import all the action types
//in a larger application, each action could have it's own file and they are all collected here.
//for an small app like this one we can manage them all here pretty easily.

/**
 * Initial Action (red button) to start the game
 * The data is collected via the API util and sent here
 * Generally it is good practice to keep these actions as minimal as possible.
 */
export const startAction = (
  dealer,
  dealerSum,
  dVsum,
  dealerValues,
  deck_id,
  player,
  playerSum,
  pVsum,
  playerValues
) => ({
  type: START_GAME,
  payload: {
    dealer,
    dealerSum,
    dVsum,
    dealerValues,
    deck_id,
    player,
    playerSum,
    pVsum,
    playerValues
  }
});

/**
 * Player or Dealer has requested a new card from the API utils.
 * The data for that update is processed through here.
 * Because this is a generic action, we pass through all player and dealer related values.
 */
export const drawAction = (
  dealer,
  dealerSum,
  dVsum,
  dealerValues,
  player,
  playerSum,
  pVsum,
  playerValues
) => ({
  type: DRAW_CARD,
  payload: {
    dealer,
    dealerSum,
    dVsum,
    dealerValues,
    player,
    playerSum,
    pVsum,
    playerValues
  }
});

/**
 * Player wants to flip a card over.
 * Until drawAction, the player can flip over the dealer cards if they want to.
 * The owner of the card clicked, the entire hand, and the visible sum are passed in.
 * Owner is set to the key for the hand and checked to figure out if dVsum or pVsum should be the visible total updated.
 */
export const flipAction = (owner, hand, vSum) => {
  let payload = {};
  payload[owner] = hand;
  if (owner === "player") {
    payload.pVsum = vSum;
  } else {
    payload.dVsum = vSum;
  }

  return {
    type: FLIP_CARD,
    payload: payload
  };
};

/**
 * Update the game from the player turn to the dealer.
 * When this is set, the dealer with automatically deal cards to itself until end of game is reached.
 */
export const turnAction = new_owner => {
  let payload = {};
  payload.turn = new_owner;
  return {
    type: END_TURN,
    payload: payload
  };
};

/**
 * When either it is concluded that a winning condition
 * for the player or dealer is reached, this action is processed to update the win/loss record and reset the game.
 */
export const endAction = (winsPlayer, winsDealer) => {
  //update the win/losee and reset the deck_id, scores & cards.
  return {
    type: END_GAME,
    payload: {
      winsPlayer: winsPlayer,
      winsDealer: winsDealer,
      playerSum: 0,
      pVsum: 0,
      dealerSum: 0,
      dVsum: 0,
      dealer: [],
      player: [],
      deck_id: null,
      turn: "player"
    }
  };
};
