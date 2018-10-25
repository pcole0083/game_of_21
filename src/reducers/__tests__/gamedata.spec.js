import gamedata from "../gamedata";
import * as types from "../../types";

describe("gamedata reducer", () => {
  let defaultState = {};
  let endGameState = {};

  let playerCards = [];
  let dealerCards = [];

  beforeEach(() => {
    defaultState = {
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

    endGameState = {
      winsPlayer: 0,
      winsDealer: 0,
      playerSum: 0,
      pVsum: 0,
      playerValues: [],
      dealerSum: 0,
      dVsum: 0,
      dealer: [],
      player: [],
      dealerValues: [],
      deck_id: "",
      turn: "player"
    };

    playerCards = [
      {
        value: "KING",
        suit: "HEARTS",
        code: "KH",
        flipped: true
      },
      {
        value: "8",
        suit: "CLUBS",
        code: "8C",
        flipped: false
      }
    ];
    const dealerCards = [
      {
        value: "JACK",
        suit: "HEARTS",
        code: "JH",
        flipped: false
      },
      {
        value: "7",
        suit: "CLUBS",
        code: "7C",
        flipped: false
      }
    ];
  });

  it("unknown action type should return the current state", () => {
    expect(gamedata(undefined, {})).toEqual(defaultState);
  });

  //types.END_GAME
  it("player won: end game action type should return the default state plus updated player win", () => {
    const wonGameState = Object.assign({}, endGameState, { winsPlayer: 1 });
    expect(
      gamedata(defaultState, {
        type: types.END_GAME,
        payload: { winsPlayer: 1, winsDealer: 0 }
      })
    ).toEqual(wonGameState);
  });
  it("player lost: end game action type should return the default state plus updated dealer win", () => {
    const lostGameState = Object.assign({}, endGameState, { winsDealer: 1 });
    expect(
      gamedata(defaultState, {
        type: types.END_GAME,
        payload: { winsPlayer: 0, winsDealer: 1 }
      })
    ).toEqual(lostGameState);
  });

  it("start game returns correctly", () => {
    const playerSum = 18;
    const dealerSum = 17;
    const playerValues = [10, 8];
    const dealerValues = [10, 7];

    const startedGameState = Object.assign({}, defaultState, {
      player: playerCards,
      dealer: dealerCards,
      playerSum: playerSum,
      dealerSum: dealerSum,
      playerValues: playerValues,
      dealerValues: dealerValues
    });
    expect(
      gamedata(defaultState, {
        type: types.START_GAME,
        payload: {
          player: playerCards,
          dealer: dealerCards,
          playerSum: playerSum,
          dealerSum: dealerSum,
          playerValues: playerValues,
          dealerValues: dealerValues
        }
      })
    ).toEqual(startedGameState);
  });

  it("draw card returns correctly", () => {
    const playerSum = 19;
    const dealerSum = 17;
    const playerValues = [10, 8, 1];
    const dealerValues = [10, 7];

    playerCards.push({
      value: "ACE",
      suit: "SPADES",
      code: "AS",
      flipped: false
    });

    const drawCardGameState = Object.assign({}, defaultState, {
      player: playerCards,
      dealer: dealerCards,
      playerSum: playerSum,
      dealerSum: dealerSum,
      playerValues: playerValues,
      dealerValues: dealerValues
    });
    expect(
      gamedata(defaultState, {
        type: types.DRAW_CARD,
        payload: {
          player: playerCards,
          dealer: dealerCards,
          playerSum: playerSum,
          dealerSum: dealerSum,
          playerValues: playerValues,
          dealerValues: dealerValues
        }
      })
    ).toEqual(drawCardGameState);
  });

  it("card flip returns all data correctly", () => {
    const playerSum = 18;
    const dealerSum = 17;
    const playerValues = [10, 8];
    const dealerValues = [10, 7];

    playerCards[1].flipped = true;

    const startedGameState = Object.assign({}, defaultState, {
      player: playerCards,
      dealer: dealerCards,
      playerSum: playerSum,
      dealerSum: dealerSum,
      playerValues: playerValues,
      dealerValues: dealerValues
    });
    expect(
      gamedata(defaultState, {
        type: types.FLIP_CARD,
        payload: {
          player: playerCards,
          dealer: dealerCards,
          playerSum: playerSum,
          dealerSum: dealerSum,
          playerValues: playerValues,
          dealerValues: dealerValues
        }
      })
    ).toEqual(startedGameState);
  });
});
