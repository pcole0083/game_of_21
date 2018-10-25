import api from "../api";
//import jest from "jest";

describe("testing the api wrapper methods", () => {
  let deck_id = "";
  let get_x_cards = 1;

  // jest.mock is returning undefined :/
  // jest.mock("../transport");
  // it("testing api connection", () => {
  //   expect.assertions(1);
  //   api.getData("new/draw/?count=1").then(data => {
  //     expect(
  //       data.objectContaining({
  //         success: true
  //       })
  //     );
  //   });
  // });
  it("updates the flipped attribute of a card", () => {
    var cardIndex = 1;
    var owner = "player";
    var flip = true;
    var props = {
      player: [
        {
          value: "KING",
          suit: "HEARTS",
          code: "KH",
          flipped: false
        }
      ]
    };

    expect.assertions(1);
    api.flipCard(cardIndex, owner, flip, props).then(data => {
      expect(
        data.objectContaining({
          flipped: true
        })
      );
    });
  });

  it("testing api.sum", () => {
    let numbers = [1, 2, 3, 4, 5];
    expect(numbers.reduce(api.sum)).toEqual(15);
  });

  it("returns the cards values", () => {
    let cards = [];
    expect(api.getValues(cards).length).toEqual(0);
    //now mock some cards and test the retun value
    cards = [
      {
        value: "KING",
        suit: "HEARTS",
        code: "KH",
        flipped: false
      },
      {
        value: "ACE",
        suit: "HEARTS",
        code: "AH",
        flipped: false
      },
      {
        value: "8",
        suit: "HEARTS",
        code: "8H",
        flipped: false
      }
    ];
    expect(api.getValues(cards)).toEqual([10, 1, 8]);
  });

  it("returns the visible (flipped) values only", () => {
    let cards = [
      {
        value: "KING",
        suit: "HEARTS",
        code: "KH",
        flipped: true
      },
      {
        value: "ACE",
        suit: "HEARTS",
        code: "AH",
        flipped: false
      },
      {
        value: "8",
        suit: "HEARTS",
        code: "8H",
        flipped: false
      }
    ];
    expect(api.visibleValues(cards).length).toEqual(3);
    //now mock some cards and test the retun value
    expect(api.visibleValues(cards)).toEqual([10, 0, 0]);
  });
});
