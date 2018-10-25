import * as actions from "../index";
import * as types from "../../types";

/**
 * Dummy data for the actions to test with
 */
const defaultState = {
  dVsum: 0,
  dealer: [],
  dealerSum: 0,
  dealerValues: [],
  deck_id: "",
  pVsum: 0,
  player: [],
  playerSum: 0,
  playerValues: [],
  turn: "player",
  winsDealer: 0,
  winsPlayer: 0
};
const startActionData = [[], 0, 0, [], "", [], 0, 0, []];
const card = {
  image: "https://deckofcardsapi.com/static/img/KH.png",
  value: "KING",
  suit: "HEARTS",
  code: "KH"
};

//describe the actions
describe("actions", () => {
  //startAction
  it("should create start action", () => {
    const payload = startActionData;
    payload[4] = "testaction001";
    const correct_output = Object.assign({}, defaultState, {
      deck_id: payload[4]
    });

    delete correct_output.turn;
    delete correct_output.winsDealer;
    delete correct_output.winsPlayer;

    const expectedAction = {
      type: types.START_GAME,
      payload: correct_output
    };
    expect(actions.startAction(...payload)).toEqual(expectedAction);
  });

  //drawAction
  it("should create draw action", () => {
    // dealer, dealerSum, dVsum, dealerValues, player, playerSum, pVsum, playerValues
    //fix the payload being sent in for this action type
    const payload = startActionData;
    payload[4] = [card];
    payload[5] = 10;
    payload[7] = [];

    //create a copy of the expect output object and assign new values.
    const correct_output = Object.assign({}, defaultState, {
      player: [card],
      playerSum: 10
    });

    //delete the props we are not expecting
    //this might be more complicated than necessary
    delete correct_output.deck_id;
    delete correct_output.turn;
    delete correct_output.winsDealer;
    delete correct_output.winsPlayer;

    const expectedAction = {
      type: types.DRAW_CARD,
      payload: correct_output
    };
    expect(actions.drawAction(...payload)).toEqual(expectedAction);
  });

  //flipAction
  it("should create a flip action", () => {
    const payload = ["player", [card], 10];
    const expectedAction = {
      type: types.FLIP_CARD,
      payload: {
        pVsum: payload[2],
        player: [card]
      }
    };
    expect(actions.flipAction(...payload)).toEqual(expectedAction);
  });
  //turnAction (now it's the dealer's turn)
  it("should create a turn action", () => {
    const payload = "dealer";
    const expectedAction = {
      type: types.END_TURN,
      payload: {
        turn: payload
      }
    };
    expect(actions.turnAction(payload)).toEqual(expectedAction);
  });

  //endAction (end game)
  it("should create a end game action", () => {
    const payload = [1, 2];
    const expectedAction = {
      type: types.END_GAME,
      payload: {
        winsPlayer: 1,
        winsDealer: 2,
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
    expect(actions.endAction(...payload)).toEqual(expectedAction);
  });
});
