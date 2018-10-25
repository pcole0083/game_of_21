import React from "react";
import { mount } from "enzyme";
import { spy } from "sinon";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

import ButtonsContainer from "../ButtonsContainer";

describe("Testing buttons module containers", () => {
  it("should have the correct props", () => {
    const Component = spy(() => null);
    const Container = ButtonsContainer(Component);

    const deck_id = "textDeckID002";

    const defaultState = {
      deck_id: deck_id,
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

    const mockStore = configureMockStore([]);
    const store = mockStore({
      post: defaultState
    });

    const wrapper = mount(
      <Provider store={store}>
        <Container />
      </Provider>
    );

    expect(wrapper.find(Component)).to.have.length(1);

    const props = wrapper.find(Component).props();

    expect(props.turn).toEqual("player");
    expect(props.deck_id).toEqual(deck_id);
  });
});
