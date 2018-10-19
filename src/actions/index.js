import { START_GAME, DRAW_CARD, FLIP_CARD, END_TURN } from "../types";

export const startAction = (
  dealer,
  dealerSum,
  dealerValues,
  deck_id,
  player,
  playerSum,
  playerValues
) => ({
  type: START_GAME,
  payload: {
    dealer,
    dealerSum,
    dealerValues,
    deck_id,
    player,
    playerSum,
    playerValues
  }
});

export const drawAction = (
  dealer,
  dealerSum,
  dealerValues,
  player,
  playerSum,
  playerValues
) => ({
  type: DRAW_CARD,
  payload: {
    dealer,
    dealerSum,
    dealerValues,
    player,
    playerSum,
    playerValues
  }
});

export const flipAction = () => ({
  type: FLIP_CARD
});

export const turnAction = () => ({
  type: END_TURN
});
