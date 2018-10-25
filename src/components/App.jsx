import React from "react";

import ButtonsContainer from "./ButtonsContainer";
import ButtonsGroup from "./ButtonsGroup";

import Hand from "./Hand";
import PlayerContainer from "./PlayerContainer";
import DealerContainer from "./DealerContainer";

import GameEnd from "./GameEnd";
import GameEndContainer from "./GameEndContainer";

const Buttons = ButtonsContainer(ButtonsGroup);

const PlayerHand = PlayerContainer(Hand);
const DealerHand = DealerContainer(Hand);
const GameEndStatus = GameEndContainer(GameEnd);

export default class App extends React.Component {
  render() {
    return (
      <div className="game-board green darken-4">
        <nav className="lime darken-4">
          <div className="nav-wrapper">
            <h1 className="brand-logo center">Play to 21!</h1>
          </div>
        </nav>

        <DealerHand />
        <PlayerHand />
        <GameEndStatus />

        <Buttons />
      </div>
    );
  }
}
